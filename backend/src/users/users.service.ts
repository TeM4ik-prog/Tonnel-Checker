import { DatabaseService } from '@/database/database.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from 'telegraf/typings/core/types/typegram';
import { AuthTonnelData, UserTonnelData } from './dto/user-data-dto';
import { adminTelegramIds, UserRoles } from '@/types/types';
import e from 'express';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private database: DatabaseService) { }


  async findAllUsers() {
    return await this.database.user.findMany({
      include: {

      }
    })
  }


  async getAllUsersData() {
    const users = await this.database.user.findMany({
      select: {
        telegramId: true,
        minProfit: true,
        messages: {
          include: {
            Gift: {
              select: {
                giftId: true,
              }
            },
          }
        }
      }
    });


    return users.map(user => ({
      telegramId: user.telegramId,
      minProfit: user.minProfit,
      hiddenMessages: user.messages
        .filter(msg => msg.hidden === true)
        .map(msg => msg.Gift.giftId)
    }));
  }

  async findUserById(userBaseId: string) {
    return await this.database.user.findUnique({
      where: { id: userBaseId },
    });
  }

  async getUserSortedMessages(userId: string) {
    const messages = await this.database.goodPriceMessage.findMany({
      where: { userId },
      include: {
        Gift: {
          include: {
            GiftsDataUpdate: {
              include: {
                Gifts: true
              }
            },
            giftMessages: {
              where: {
                userId: userId
              }
            }
          }
        }
      }
    });

    const filteredMessages = messages.map(msg => ({
      ...msg,
      Gift: {
        ...msg.Gift,
        GiftsDataUpdate: {
          ...msg.Gift.GiftsDataUpdate,
          Gifts: msg.Gift.GiftsDataUpdate?.Gifts.filter(gift => gift.id == msg.giftId) || [], // length also 1
          message: msg.Gift.giftMessages[0],


        }
      }
    }));

    return {
      displayed: filteredMessages
        .filter(msg => msg.hidden === false)
        .map(msg => msg.Gift.GiftsDataUpdate),
      hidden: filteredMessages
        .filter(msg => msg.hidden === true)
        .map(msg => msg.Gift.GiftsDataUpdate)
    };
  }

  async findUserByTelegramId(telegramId: number) {
    return await this.database.user.findUnique({
      where: {
        telegramId: telegramId
      },
      // include:{

      //   Filters: {
      //     select: {
      //       nft: true,
      //       models: true,
      //       backgrounds: true,
      //       symbols: true
      //     }
      //   }
      // }
    })

  }

  async findOrCreateUser(createUserDto: User) {
    const { id, last_name, first_name, username, is_premium } = createUserDto

    const existingUser = await this.database.user.findUnique({
      where: {
        telegramId: id,

      }
    })

    if (existingUser && adminTelegramIds.includes(existingUser.telegramId)) {
      return await this.database.user.update({
        where: {
          telegramId: existingUser.telegramId
        },
        data: {
          role: UserRoles.admin,
          hasRights: true
        }


      })
    }

    // console.log('existingUser',existingUser)

    if (existingUser) return existingUser


    return await this.database.user.create({
      data: {
        telegramId: id,
        firstName: first_name,
        lastName: last_name,
        username: username
      }
    })

  }

  async getUserMinProfit(telegramId: number) {

    return (await this.database.user.findUnique({
      where: {
        telegramId
      }
    })).minProfit


  }


  async updateUserMinProfit(telegramId: number, minProfit: number) {

    // TODO uncomment later

    // if (minProfit < 0.3) {
    //   return new BadRequestException('слишком маленький профит')
    // }


    return await this.database.user.update({
      where: {
        telegramId
      },
      data: {
        minProfit
      }
    })
  }

  async updateUserAuthTonnelData(telegramId: number, authTonnelData: string) {

    return await this.database.user.update({
      where: {
        telegramId
      },
      data: {
        authTonnelData: authTonnelData
      }
    })
  }

  async updateUserRights(telegramId: number) {
    const user = await this.findUserByTelegramId(telegramId)

    return await this.database.user.update({
      where: {
        telegramId
      },
      data: {
        hasRights: !user.hasRights
      }
    })
  }

  async restoreGiftMessage(messageData: { messageId: string, chatId: string }, userId: string) {
    return await this.database.goodPriceMessage.update({
      where: {
        userId,
        chatId_messageId: {
          messageId: Number(messageData.messageId),
          chatId: Number(messageData.chatId)
        }
      },
      data: {
        hidden: false
      }
    })

  }


  decodeInitData(encoded: string): AuthTonnelData {
    try {
      const params = new URLSearchParams(encoded);

      const userRaw = params.get('user');
      if (!userRaw) throw new Error('user field is missing');

      const user: UserTonnelData = JSON.parse(decodeURIComponent(userRaw));

      return {
        user,
        chat_instance: params.get('chat_instance') || '',
        chat_type: params.get('chat_type') || '',
        auth_date: Number(params.get('auth_date') || 0),
        signature: params.get('signature') || '',
        hash: params.get('hash') || '',
      };
    } catch (e) {
      throw new Error('Invalid initData format or decoding error');
    }
  }

  async findOrCreateAdmins() {

    // const superAdmins = await this.database.user.findMany({
    //   where: {
    //     telegramId: {
    //       in: superAdminTelegramIds
    //     }
    //   }
    // })


    // console.log(superAdmins)

  }


  onModuleInit() {
    // this.findOrCreateAdmins()
  }



}






