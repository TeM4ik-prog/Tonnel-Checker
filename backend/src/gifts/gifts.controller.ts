import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GiftsService } from './gifts.service';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Get('/last-update')
  findLastUpdate() {
    return this.giftsService.findLastUpdate();
  }


}
