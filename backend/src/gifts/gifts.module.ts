import { DatabaseModule } from '@/database/database.module';
import { TelegramModule } from '@/telegram/telegram.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GiftsController } from './gifts.controller';
import { GiftsService } from './gifts.service';
import { UsersModule } from '@/users/users.module';
import { FiltersModule } from '@/filters/filters.module';

@Module({
  imports: [
    DatabaseModule,
    HttpModule,
    UsersModule,
    FiltersModule,
    TelegramModule,
    ScheduleModule.forRoot()
  ],
  controllers: [GiftsController],
  providers: [GiftsService],
  exports: [GiftsService],
})
export class GiftsModule { }
