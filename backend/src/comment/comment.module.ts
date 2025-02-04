import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { DatabaseModule } from '@/database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import { transliterate } from 'transliteration';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [DatabaseModule,

    MulterModule.register({
      storage: diskStorage({
        destination: (_, file, callback) => {
          const isVideo = file.mimetype.startsWith('video');
          const uploadPath = isVideo ? './uploads/videos' : './uploads'

          callback(null, uploadPath);
        },
        filename: (_, file, callback) => {
          let originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');

          originalName = originalName.replace(/\s+/g, '_');

          if (/[а-яА-ЯёЁ]/.test(originalName)) {
            originalName = transliterate(originalName)
          }

          const finalFileName = `${originalName}`;
          callback(null, finalFileName)
        },
      }),
    })
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule { }
