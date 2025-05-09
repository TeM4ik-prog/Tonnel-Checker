import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { GiftsModule } from './gifts/gifts.module';
import { TelegramModule } from './telegram/telegram.module';
import { AdminModule } from './admin/admin.module';
import { ProxyModule } from './proxy/proxy.module';
import { FiltersModule } from './filters/filters.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    AdminModule,
    TelegramModule,
    GiftsModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),

    ProxyModule,

    FiltersModule,
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
    await this.databaseService.packGiftsDataUpdate.deleteMany()
    await this.databaseService.giftsDataUpdate.deleteMany()
    await this.databaseService.giftModel.deleteMany()
    await this.databaseService.goodPriceMessage.deleteMany()
    await this.databaseService.accessRequest.deleteMany()
    await this.databaseService.user.deleteMany()

    await this.databaseService.usersConfig.deleteMany()

    await this.databaseService.filter.deleteMany()


    // this.databaseService.drop



  }
}
