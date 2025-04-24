import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { GiftsModule } from './gifts/gifts.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TelegramModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    GiftsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})

export class AppModule implements OnModuleInit {
  constructor(
    private readonly databaseService: DatabaseService,
  ) { }


  async onModuleInit() {
    // полная очистка базы данных
    // await this.cleanDatabase();
  }

  async cleanDatabase() {
    // await this.databaseService.packGiftsDataUpdate.deleteMany()
    // await this.databaseService.giftModel.deleteMany()
    await this.databaseService.goodPriceMessage.deleteMany()



  }
}
