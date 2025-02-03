import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Module({
  imports: [

    MulterModule.register({
          storage: diskStorage({
            destination: './uploads/videos',
            filename: (_, file, callback) => {
              const originalName = file.originalname.replace(/\s+/g, '_');
              callback(null, `${originalName}`);
            },
          }),
        }),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
