import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service';
import { EmailUsersService, UsersService } from './users/users.service';
import { AdminModule } from './admin/admin.module';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { CategoryService } from './category/category.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ReviewModule } from './review/review.module';
import { CommentModule } from './comment/comment.module';
import { MulterModule } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { extname } from 'path';
import { transliterate } from 'transliteration';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    AdminModule,
    JwtModule,
    CategoryModule,
    ScheduleModule.forRoot(),
    PostModule,
    CategoryModule,

    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../uploads'),
      serveRoot: '/uploads',
    }),

    ReviewModule,

    CommentModule,

    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
  exports: [],
})
export class AppModule {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly usersService: UsersService,
    private readonly emailUsersService: EmailUsersService,
    private readonly categoryService: CategoryService,
  ) { }

  async onModuleInit() {
    // создание фейковых пользователей
    // await this.usersService.generateUsers(100)

    // // создание администраторов и получение информации о создании
    const responseInfo = await this.emailUsersService.createAdminsOnInit();
    // console.log(responseInfo)


    // создание категорий 
    this.categoryService.onCreateCategories()


    // полная очистка базы данных
    // await this.cleanDatabase();
  }

  async cleanDatabase() {
    // await this.databaseService.verificationCode.deleteMany()
    // await this.databaseService.emailUser.deleteMany()
    // await this.databaseService.telegramUser.deleteMany()
    // await this.databaseService.vkUser.deleteMany()
    // await this.databaseService.googleUser.deleteMany()
    // await this.databaseService.userBase.deleteMany()

    await this.databaseService.review.deleteMany();

  }
}
