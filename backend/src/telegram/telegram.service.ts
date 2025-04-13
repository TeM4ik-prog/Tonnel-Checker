import { CreateGiftDto } from '@/gifts/dto/create-gift.dto';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Input, Telegraf } from 'telegraf';
import { InputFile } from 'telegraf/typings/core/types/typegram';


@Injectable()
export class TelegramService {
  private activeChats: Set<number> = new Set();
  private goodPriceMessages: Map<string, { chatId: number, messageId: number }> = new Map();


  constructor(@InjectBot() private readonly bot: Telegraf) { }

  getInfo(userId: number | undefined): string {
    return `ID пользователя: ${userId}`;
  }

  getPhotoStream(filePath: string): InputFile {
    return Input.fromLocalFile(filePath)
  }

  addToActiveChats(msg: { chat?: { id: number } }) {
    // console.log(msg)
    if (msg.chat) {
      this.activeChats.add(msg.chat.id);

      console.log(this.activeChats)
    }
  }

  // getActiveChats(){
  //   return this.activeChats
  // }
  //   this.bot.on('web_app_data', (msg) => {
  //     const data = JSON.parse(msg.web_app_data.data);

  //     console.log(data)

  //     if (data.action === 'webapp_closed') {
  //       console.log(`Пользователь ${data.userId} закрыл приложение в ${data.timestamp}`);
  //       this.bot.sendMessage(msg.chat.id, 'Спасибо за использование нашего приложения!');
  //     }
  //   });



  //   this.bot.onText(/\/start/, async (msg) => {
  //     console.log('start')
  //     const chatId = msg.chat.id;
  //     const userId = msg.from.id;
  //     const username = msg.chat.username;
  //     const usernameq = msg.chat.hash;
  //     const telegramId = chatId.toString();

  //     console.log(msg.chat)

  //     // Сохраняем активный чат
  //     this.activeChats.add(chatId);

  //     const appUrl = this.configService.get<string>('APP_URL');

  //     this.bot.sendMessage(chatId, 'Это приложение показывает прибыль при продаже товаров на Tonnel', {
  //       reply_markup: {
  //         inline_keyboard: [
  //           [{ text: 'Войти', web_app: { url: appUrl } }],
  //         ],
  //       },
  //     })
  //   })


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


  async sendMessageGoodPriceGiftToAll(firstGift: CreateGiftDto, secondGift: CreateGiftDto, profit: number, sellPrice: number) {

    for (const chatId of this.activeChats) {
      try {
        const messageText =
          `💰 товар 1: ${(firstGift.price * 1.1).toFixed(2)} TON\n` +
          `💰 товар 2: ${(secondGift.price * 1.1).toFixed(2)} TON\n\n` +
          `💰 Прибыль: ${profit.toFixed(3)} TON\n` +
          `💵 Цена продажи: ${sellPrice.toFixed(3)} TON\n\n` +
          `🔗 Ссылка: https://t.me/nft/${firstGift.name.replace(/[\s-]+/g, '')}-${firstGift.gift_num}`;

        const message = await this.bot.telegram.sendMessage(chatId, messageText,
          {
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [{ text: 'Просмотреть!!! ', url: `https://t.me/tonnel_network_bot/gift?startapp=${firstGift.gift_id}` }],
              ],
            },
          }
        );
        // console.log(message)

        const messageKey = `${chatId}_${message.message_id}`;
        this.goodPriceMessages.set(messageKey, {
          chatId,
          messageId: message.message_id
        });
      } catch (error) {
        console.log(error)
        if (error.code === 400 && error.response.body.error_code === 400) {
          this.activeChats.delete(chatId);
        }
      }
    }

    return
  }


}