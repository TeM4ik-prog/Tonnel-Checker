import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DatabaseModule } from '@/database/database.module';
import { transliterate } from 'transliteration';


@Module({
  imports: [
    DatabaseModule,

    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/videos',
        filename: (_, file, callback) => {
          let originalName = Buffer.from(file.originalname, 'latin1').toString('utf8')

          originalName = originalName.replace(/\s+/g, '_')

          if (/[а-яА-ЯёЁ]/.test(originalName)) {
            originalName = transliterate(originalName)
          }

          callback(null, originalName);
        },
      }),
    }),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule { }
