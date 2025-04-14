import { DatabaseService } from '@/database/database.service';
import { CreateGiftDto } from '@/gifts/dto/create-gift.dto';
import { UsersService } from '@/users/users.service';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Input, Telegraf } from 'telegraf';
import { InputFile, Message } from 'telegraf/typings/core/types/typegram';


@Injectable()
export class TelegramService {
  // private activeChats: Map<string, { chatId: number, userTelegramId: number }> = new Map();
  private goodPriceMessages: Map<string, { chatId: number, messageId: number }> = new Map();


  constructor(
    @InjectBot() private readonly bot: Telegraf,
    @Inject('DEFAULT_BOT_NAME') private readonly botName: string,
    private readonly usersService: UsersService,
    private readonly database: DatabaseService
  ) { }


  
  getInfo(userId: number | undefined): string {
    return `ID пользователя: ${userId}`;
  }

  getPhotoStream(filePath: string): InputFile {
    return Input.fromLocalFile(filePath)
  }

  // addToActiveChats(msg: Message) {
  //   if (msg.chat) {
  //     const key = `${msg.chat.id}:${msg.from.id}`;
  //     this.activeChats.set(key, { chatId: msg.chat.id, userTelegramId: msg.from.id });
  //     console.log(this.activeChats)
  //   }
  // }


  async deleteAllGoodPriceMessages() {
    for (const [_, messageInfo] of this.goodPriceMessages) {
      try {
        await this.bot.telegram.deleteMessage(messageInfo.chatId, messageInfo.messageId);
      } catch (error) {
        console.log(error)
      }
    }
    this.goodPriceMessages.clear();
  }


  async addToActiveChats(msg: Message) {

    const chatId = msg.chat.id
    const userTelegramId = msg.from.id


    await this.database.activeChat.upsert({
      where: { chatId_userTelegramId: { chatId, userTelegramId } },
      update: {},
      create: {
        chatId,
        userTelegramId,
      },
    });
  }

  // async saveGoodPriceMessage(chatId: number, messageId: number) {
  //   await this.database.goodPriceMessage.upsert({
  //     where: { chatId_messageId: { chatId, messageId } },
  //     update: {},
  //     create: {
  //       chatId,
  //       messageId,
  //     },
  //   });
  // }


  async sendMessageGoodPriceGiftToAll(
    firstGift: CreateGiftDto,
    secondGift: CreateGiftDto,
    profit: number,
    sellPrice: number,
  ) {
    // Загружаем всех активных пользователей из БД
    const activeChats = await this.database.activeChat.findMany();
  
    // Загружаем пользователей и их минимальный профит
    const users: { telegramId: number; minProfit: number }[] = await this.usersService.getAllUsersMinProfit();
    const userProfitMap = new Map(users.map(user => [user.telegramId, user.minProfit]));
  
    for (const { chatId, userTelegramId } of activeChats) {
      const minProfit = userProfitMap.get(userTelegramId);
      if (minProfit === undefined || profit < minProfit) continue;
  
      try {
        const messageText =
          `💰 товар 1: ${(firstGift.price * 1.1).toFixed(2)} TON\n` +
          `💰 товар 2: ${(secondGift.price * 1.1).toFixed(2)} TON\n\n` +
          `💰 Прибыль: ${profit.toFixed(3)} TON\n` +
          `💵 Цена продажи: ${sellPrice.toFixed(3)} TON\n\n` +
          `🔗 Ссылка: https://t.me/nft/${firstGift.name.replace(/[\s-]+/g, '')}-${firstGift.gift_num}`;
  
        const message = await this.bot.telegram.sendMessage(chatId, messageText, {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Просмотреть!!!', url: `https://t.me/tonnel_network_bot/gift?startapp=${firstGift.gift_id}` }],
            ],
          },
        });
  
        const messageKey = `${chatId}_${message.message_id}`;
        this.goodPriceMessages.set(messageKey, {
          chatId,
          messageId: message.message_id,
        });
      } catch (error) {
        console.error(error);
  
        if (error.code === 400 && error.response?.body?.error_code === 400) {
          // Удаляем чат из базы, если бот не может отправить сообщение
          await this.database.activeChat.delete({
            where: {
              chatId_userTelegramId: {
                chatId,
                userTelegramId,
              },
            },
          });
        }
      }
    }
  }
  

}