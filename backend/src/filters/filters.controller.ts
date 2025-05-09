import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { IFilters } from '@/types/types';
import { UserId } from '@/decorators/userid.decorator';

@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUserFilters(@UserId() userId: string) {
    console.log(userId)

    return this.filtersService.getUserFilters(userId);
  }


  @Post('apply-filters')
  @UseGuards(JwtAuthGuard)
  async applyFilters(@Body() body: { filters: IFilters[] }, @UserId() userId: string) {
    console.log(body)

    // await this.giftsService.fetchGiftsDataFromTonnel()

    return await this.filtersService.applyFilters(body.filters, userId)
  }
}
