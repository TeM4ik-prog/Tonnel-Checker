import { DatabaseService } from '@/database/database.service';
import { IUserGiftData } from '@/types/types';
import { UsersService } from '@/users/users.service';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, UserRoles } from '@prisma/client';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Input, Telegraf } from 'telegraf';
import { InputFile, Message } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    @Inject('DEFAULT_BOT_NAME') private readonly botName: string,
    private readonly usersService: UsersService,
    private readonly database: DatabaseService,
    private readonly configService: ConfigService
  ) { }


  getPhotoStream(filePath: string): InputFile {
    return Input.fromLocalFile(filePath)
  }

  async sendMessage(telegramIdId: number, message: string) {
    return await this.bot.telegram.sendMessage(telegramIdId, message)
  }

  async sendMessageToAdmins(message: string) {
    const allAdmins = await this.usersService.findUsersByRole(UserRoles.ADMIN)
    const appUrl = this.configService.get('APP_URL')

    console.log(`${appUrl}/admin/access-requests`)

    for (const admin of allAdmins) {
      await this.bot.telegram.sendMessage(admin.telegramId, message, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Просмотреть', web_app: { url: `${appUrl}admin/access-requests` } },
            ]
          ]
        }
      })
    }
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
        await this.database.goodPriceMessage.deleteMany({
          where: {
            chatId: message.chatId,
            giftId: message.giftId
          }
        })

        await this.bot.telegram.deleteMessage(message.chatId, message.messageId)


      } catch (error) {
        console.log('cant delete')
        // console.log(error)
      }
    }
  }

  async findGoodPriceMessages(id: string) {
    return await this.database.goodPriceMessage.findUnique({
      where: { id: id }
    })
  }

  async addToActiveChats(msg: Message) {
    const userTelegramId = msg.from.id


    await this.database.activeChat.upsert({
      where: {  userTelegramId  },
      update: {},
      create: {
        userTelegramId,
      },
    });
  }

  async saveGoodPriceMessage(chatId: number, messageId: number, firstGift: Prisma.GiftGetPayload<{}>) {
    const user = await this.usersService.findUserByTelegramId(chatId);

    await this.database.goodPriceMessage.upsert({
      where: { chatId_messageId: { chatId, messageId } },
      update: {},
      create: {
        chatId,
        messageId,
        giftId: firstGift.id, // Используем firstGift.id, а не giftId
        userId: user.id,
        // Gift: {
        //   connect: {
        //     id: firstGift.id,  // Связь по первичному ключу id
        //   },
        // },
      },
    });
  }





  async sendMessageGoodPriceGiftToAll(
    giftsDataUpdate: Prisma.GiftsDataUpdateGetPayload<{ include: { Gifts: true }}>,
    profit: number,
    sellPrice: number,
    activeChat: Prisma.ActiveChatGetPayload<{}>,
    user: IUserGiftData,
  ) {
    const firstGift = giftsDataUpdate.Gifts[0]
    const secondGift = giftsDataUpdate.Gifts[1]
   
    if (user === undefined || profit < user.minProfit){
      console.log('min profit')
      return
    };

    const goodUserPriceMessages = await this.database.goodPriceMessage.findMany({
      where: { chatId: activeChat.userTelegramId },
      include: {
        Gift: true
      }
    })
    const messagesToDelete = goodUserPriceMessages.filter((el) => el.Gift.giftId == firstGift.giftId)

    if ((user.hiddenMessages).includes(firstGift.giftId)) {
      console.log(firstGift.giftId + ' this gift hidden ')
      return
    }

    await this.deleteArUserGoodPriceMessages(messagesToDelete)

    try {
      const messageText =
        `💰 товар 1: ${(firstGift.price * 1.1).toFixed(2)} TON\n` +
        `💰 товар 2: ${(secondGift.price * 1.1).toFixed(2)} TON\n\n` +
        `💰 Прибыль: ${profit.toFixed(3)} TON\n` +
        `💵 Цена продажи: ${sellPrice.toFixed(3)} TON\n\n` +
        `🔗 [Ссылка на товар](https://t.me/nft/${firstGift.name.replace(/[\s-]+/g, '')}-${firstGift.giftNum})\n\n` +
        `[Просмотреть!!!](https://t.me/tonnel_network_bot/gift?startapp=${firstGift.giftId}) | [Фильтр](${giftsDataUpdate.filterLink})`

      const message = await this.bot.telegram.sendMessage(activeChat.userTelegramId, messageText, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Просмотреть!!!', url: `https://t.me/tonnel_network_bot/gift?startapp=${firstGift.giftId}` },
              { text: 'Скрыть', callback_data: 'hideGiftMessage' }
            ],
            [
              { text: 'Фильтр', url: giftsDataUpdate.filterLink },
            ]
          ],
        },
      });

      await this.saveGoodPriceMessage(activeChat.userTelegramId, message.message_id, firstGift)

    } catch (error: any) {
      console.error(error);

      // if (error.code === 400 && error.response?.body?.error_code === 400) {
      //   await this.database.activeChat.delete({
      //     where: {
      //       chatId_userTelegramId: {
      //         chatId,
      //         userTelegramId,
      //       },
      //     },
      //   });
      // }
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

      await this.bot.telegram.deleteMessage(ctx.message.chat.id, ctx.message.message_id)
    } catch (error) {
      console.error('Ошибка при скрытии сообщения:', error);
    }
  }


}