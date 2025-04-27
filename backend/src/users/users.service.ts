import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { AuthTonnelData, CreateUserDto, UserTonnelData } from './dto/user-data-dto';
import { User } from 'telegraf/typings/core/types/typegram';
import { TelegramService } from '@/telegram/telegram.service';

@Injectable()
export class UsersService {
  constructor(private database: DatabaseService,
    // @Inject(forwardRef(() => TelegramService))
    // private readonly telegramService: TelegramService,
  ) { }


  async getAllUsersData() {
    const users = await this.database.user.findMany({
      select: {
        telegramId: true,
        minProfit: true,
        messages: {
          select: {
            giftId: true,
            hidden: true
          }
        }
      }
    });

    return users.map(user => ({
      telegramId: user.telegramId,
      minProfit: user.minProfit,
      messages: user.messages.filter(msg => msg.hidden === true)
        .map(msg => ({
          giftId: msg.giftId,
          hidden: msg.hidden
        }))
    }));
  }


  async findUserById(userBaseId: string) {
    return await this.database.user.findUnique({
      where: { id: userBaseId },
    });
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



}






