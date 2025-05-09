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
  @UseGuards(JwtAuthGuard)
  async findLastUpdate(@UserId() userId: string) {
    const lastUpdate = await this.giftsService.findLastUpdate(userId)
    return lastUpdate
  }

  @Get('/gift-models')
  async getGiftModels() {
    const models = await this.giftsService.getGiftModels()
    return models
  }

  @Patch('restore-gift-message')
  @UseGuards(JwtAuthGuard)
  async restoreGiftMessage(@Body() messageData: { messageId: string, chatId: string }, @UserId() userId: string) {
    console.log(messageData)
    return await this.usersService.restoreGiftMessage(messageData, userId)
  }

}
