import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { CreateUserDto } from './dto/user-data-dto';
import { User } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class UsersService {
  constructor(private database: DatabaseService) { }


  async getAllUsersMinProfit() {
    return await this.database.user.findMany({
      select: {
        telegramId: true,
        minProfit: true
      }
    })
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
      }
    })

  }

  async findOrCreateUser(createUserDto: User) {
    const { id, last_name, first_name, username, is_premium } = createUserDto

    const existingUser = await this.database.user.findUnique({
      where: {
        telegramId: id,

      }
    })

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




}






