import { DatabaseService } from '@/database/database.service';
import { adminTelegramIds, IUserGiftData } from '@/types/types';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { RequestStatus, UserRoles } from '@prisma/client';
import { User } from 'telegraf/typings/core/types/typegram';
import { AuthTonnelData, UserTonnelData } from './dto/user-data-dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private database: DatabaseService) { }

  async findAllUsers() {
    return await this.database.user.findMany({
      include: {
        UsersConfig: true
      }
    })
  }

  async getAllUsersData(): Promise<IUserGiftData[]> {
    const users = await this.database.user.findMany({
      where: {
        hasAccess: true
      },
      select: {
        id: true,
        telegramId: true,
        UsersConfig: {
          select: {
            minProfit: true
          }
        },
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
      id: user.id,
      telegramId: user.telegramId,
      minProfit: user.UsersConfig.minProfit,
      hiddenMessages: user.messages
        .filter(msg => msg.hidden === true)
        .map(msg => msg.Gift.giftId)
    }));
  }

  async findUserById(userBaseId: string) {
    return await this.database.user.findUnique({
      where: { id: userBaseId },
      include: {
        UsersConfig: true
      }
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
      include: {
        UsersConfig: {
          include: {
            filters: true
          }
        }
      }
    })
  }

  async findUsersByRole(role: UserRoles) {
    return await this.database.user.findMany({
      where: {
        role
      }
    })
  }

  async findOrCreateUser(createUserDto: User) {
    const { id, last_name, first_name, username, is_premium } = createUserDto

    const existingUser = await this.database.user.findUnique({
      where: {
        telegramId: id,
      },
      include: {
        UsersConfig: {
          include: {
            filters: true
          }
        }
      }
    })

    if (existingUser && adminTelegramIds.includes(existingUser.telegramId)) {
      const user = await this.database.user.update({
        where: {
          telegramId: existingUser.telegramId
        },
        data: {
          role: UserRoles.ADMIN,
          hasAccess: true
        },
        include: {
          UsersConfig: {
            include: {
              filters: true
            }
          }
        }
      })

      return user
    }

    if (existingUser) return existingUser

    const tempConfig = await this.database.usersConfig.create({
      data: {
        userId: 'temp'
      }
    });

    const user = await this.database.user.create({
      data: {
        telegramId: id,
        firstName: first_name,
        lastName: last_name,
        username: username,
        usersConfigId: tempConfig.id
      }
    });

    const usersConfig = await this.database.usersConfig.create({
      data: {
        userId: user.id
      }
    });

    const updatedUser = await this.database.user.update({
      where: {
        id: user.id
      },
      data: {
        usersConfigId: usersConfig.id
      },
      include: {
        UsersConfig: {
          include: {
            filters: true
          }
        }
      }
    });

    // Удаляем временную конфигурацию
    await this.database.usersConfig.delete({
      where: {
        id: tempConfig.id
      }
    });

    return updatedUser;
  }

  async getUserMinProfit(telegramId: number) {
    const user = await this.database.user.findUnique({
      where: {
        telegramId
      },
      include: {
        UsersConfig: {
          select: {
            minProfit: true
          }
        }
      }
    });

    return user.UsersConfig.minProfit;
  }

  async updateUserMinProfit(telegramId: number, minProfit: number) {
    const user = await this.database.user.findUnique({
      where: { telegramId },
      include: { UsersConfig: true }
    });

    return await this.database.usersConfig.update({
      where: {
        id: user.UsersConfig.id
      },
      data: {
        minProfit
      }
    });
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
        hasAccess: !user.hasAccess,
        AccessRequest: {
          update: {
            status: user.hasAccess ? RequestStatus.REJECTED : RequestStatus.APPROVED
          }
        }
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






