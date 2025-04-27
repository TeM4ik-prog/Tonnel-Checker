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
  // private goodPriceMessages: Map<string, { chatId: number, messageId: number }> = new Map();

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

  async deleteGoodPriceMessage(id: string) {
    return await this.database.goodPriceMessage.delete({
      where: {
        id
      }
    })
  }

  async deleteArUserGoodPriceMessages(messages: { chatId: number, giftId: number, messageId: number }[]) {
    for (const message of messages) {
      try {
        await this.bot.telegram.deleteMessage(message.chatId, message.messageId)
        await this.database.goodPriceMessage.deleteMany({
          where: {
            chatId: message.chatId,
            giftId: message.giftId
          }
        })

      } catch (error) {
        console.log('cant delete')
        console.log(error)
      }
    }
  }

  async findGoodPriceMessages(id: string) {
    return await this.database.goodPriceMessage.findUnique({
      where: { id: id }
    })
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

  async saveGoodPriceMessage(chatId: number, messageId: number, giftId: number) {

    const user = await this.usersService.findUserByTelegramId(chatId)

    await this.database.goodPriceMessage.upsert({
      where: { chatId_messageId: { chatId, messageId } },
      update: {},
      create: {
        chatId,
        messageId,
        giftId,
        userId: user.id
      }
    });
  }


  async sendMessageGoodPriceGiftToAll(
    firstGift: CreateGiftDto,
    secondGift: CreateGiftDto,
    profit: number,
    sellPrice: number,

    activeChats: { id: number, chatId: number, userTelegramId: number }[],
    users: { telegramId: number, minProfit: number, messages: number[] }[]
  ) {


    for (const { chatId, userTelegramId } of activeChats) {
      const user = users.find((user) => user.telegramId == userTelegramId);
      if (user === undefined || profit < user.minProfit) continue;

      const goodUserPriceMessages = await this.database.goodPriceMessage.findMany({ where: { chatId } })
      const messagesToDelete = goodUserPriceMessages.filter((el) => el.giftId == firstGift.gift_id && !el.hidden)

      // console.log(messagesToDelete.map(el => ({ giftId: el.giftId, chatId: el.chatId, messageId: el.messageId })))
      // console.log(messagesToDelete)

      await this.deleteArUserGoodPriceMessages(messagesToDelete)

      if (user.messages.includes(firstGift.gift_id)){
        console.log('this gift hidden ')
      }


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
                [
                  { text: 'Просмотреть!!!', url: `https://t.me/tonnel_network_bot/gift?startapp=${firstGift.gift_id}` },
                  { text: 'Скрыть', callback_data: 'hideGiftMessage' }
                ],
              ],
            },
          });

          await this.saveGoodPriceMessage(chatId, message.message_id, firstGift.gift_id)

          // const messageKey = `${chatId}_${message.message_id}`;
          // this.goodPriceMessages.set(messageKey, {
          //   chatId,
          //   messageId: message.message_id,
          // });
        } catch (error: any) {
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


  async hideGiftMessage(ctx: Context) {
    console.log(ctx);
    try {
      await this.database.goodPriceMessage.update({
        where: {
          chatId_messageId: {
            messageId: ctx.message.message_id,
            chatId: ctx.message.chat.id,
          },
        },
        data: {
          hidden: true
        },
      });

      // Можно удалить сообщение, если нужно
      await this.bot.telegram.deleteMessage(ctx.message.chat.id, ctx.message.message_id)
    } catch (error) {
      console.error('Ошибка при скрытии сообщения:', error);
    }
  }


}