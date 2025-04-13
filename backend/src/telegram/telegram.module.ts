import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegramUpdate } from './telegram.update';
import { TelegramService } from './telegram.service';
import { GiftsModule } from '@/gifts/gifts.module';

@Module({
  imports: [
    ConfigModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('BOT_TOKEN'),
        webhook: configService.get<string>('APP_URL')
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => GiftsModule)

  ],
  providers: [TelegramUpdate, TelegramService],
  exports: [TelegramService]
})
export class TelegramModule { }
