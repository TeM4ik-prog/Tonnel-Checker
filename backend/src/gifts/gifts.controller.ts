import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException, UseGuards } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { IFilters } from '@/types/types';
import { UsersService } from '@/users/users.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UserId } from '@/decorators/userid.decorator';

@Controller('gifts')
export class GiftsController {
  constructor(
    private readonly giftsService: GiftsService,
    private readonly usersService: UsersService
  ) { }

  @Get('last-update')
  // @UseGuards(JwtAuthGuard)
  async findLastUpdate(@Req() req) {
    const filters = await this.giftsService.getFilters()
    const lastUpdate = await this.giftsService.findLastUpdate()
    return { lastUpdate: lastUpdate?.GiftsDataUpdate || [], filters }
  }


  @Get('/gift-models')
  async getGiftModels() {
    const filters = await this.giftsService.getFilters()

    const models = await this.giftsService.getGiftModels()
    return { models, filters }
  }


  @Get('filters')
  async getUserFilters() {
    return await this.giftsService.getFilters()
  }


  @Post('apply-filters')
  @UseGuards(JwtAuthGuard)
  async applyFilters(@Body() body: { filters: IFilters[] }, res: Response) {
    console.log(body)

    // await this.giftsService.fetchGiftsDataFromTonnel()

    return await this.giftsService.applyFilters(body.filters)
  }


  @Patch('restore-gift-message')
  @UseGuards(JwtAuthGuard)
  async restoreGiftMessage(@Body() messageData: { messageId: string, chatId: string }, @UserId() userId: string) {

    console.log(messageData)

    return await this.usersService.restoreGiftMessage(messageData, userId)
  }



}
