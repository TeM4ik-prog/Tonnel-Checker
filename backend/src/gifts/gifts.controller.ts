import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { IUserFilters } from '@/types/types';
import { UsersService } from '@/users/users.service';
import { Response } from 'express';

@Controller('gifts')
export class GiftsController {
  constructor(
    private readonly giftsService: GiftsService,
    private readonly usersService: UsersService
  ) { }

  @Get('last-update')
  findLastUpdate() {
    return this.giftsService.findLastUpdate();
  }


  @Get('/gift-models/:telegramId')
  async getGiftModels(@Param('telegramId') telegramId: string) {
    const user = await this.usersService.findUserByTelegramId(parseInt(telegramId))
    if (!user) throw new BadRequestException('user not found')
    console.log(user)

    const models = await this.giftsService.getGiftModels()
    return {models, userFilters: user.UserFilters}
  }


  @Get('user-filters/:telegramId')
  async getUserFilters(@Param('telegramId') telegramId: string) {

    const user = await this.usersService.findUserByTelegramId(parseInt(telegramId))
    if (!user) throw new BadRequestException('user not found')
    console.log(user)

    return user.UserFilters

  }


  @Post('apply-filters')
  async applyFilters(@Body() body: { filters: IUserFilters[], userData: string }, res: Response) {
    console.log(body.filters)
    const parsedUserData = JSON.parse(body.userData)

    // console.log(parsedUserData.id)
    if (!parsedUserData.id) throw new BadRequestException('Invalid data')


    const user = await this.usersService.findUserByTelegramId(parsedUserData.id)
    if (!user) throw new BadRequestException('user not found')

    // console.log(user)
    return await this.giftsService.applyFilters(body.filters, user.id)



  }



}
