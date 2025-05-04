import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegramAction, TelegramUpdate } from './telegram.update';
import { TelegramService } from './telegram.service';
import { GiftsModule } from '@/gifts/gifts.module';
import { UsersModule } from '@/users/users.module';
import { session } from 'telegraf';
import { MinProfitScene } from './scenes/minProfit.scene';
import { DatabaseModule } from '@/database/database.module';
import { AdminModule } from '@/admin/admin.module';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => DatabaseModule),
   AdminModule,

    forwardRef(() => UsersModule),

    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('BOT_TOKEN'),
        webhook: configService.get<string>('APP_URL'),

        middlewares: [
          session(),
        ],
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => GiftsModule)

  ],
  providers: [
    TelegramAction,

    TelegramUpdate,
    TelegramService,

    MinProfitScene,
  ],
  exports: [TelegramService]
})
export class TelegramModule { }
