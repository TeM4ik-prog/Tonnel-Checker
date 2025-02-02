import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DatabaseModule } from '@/database/database.module';
import { MulterModule } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { CategoryModule } from '@/category/category.module';

@Module({
  imports: [DatabaseModule,
    CategoryModule,


    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          const originalName = file.originalname.replace(/\s+/g, '_');
          callback(null, `${originalName}`);
        },
      }),
    }),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
