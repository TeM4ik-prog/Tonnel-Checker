import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { DatabaseService } from '@/database/database.service';

@Injectable()
export class ReviewService {
  constructor(
    protected dbService: DatabaseService,
  ) { }

  async create(text: string, imagePath: string) {
    console.log(text, imagePath)


    return await this.dbService.review.create({
      data: {
        content: text,
        imageUrl: imagePath,
      },
    })
  }

  async findAll() {
    return await this.dbService.review.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async delete(id: string) {
    return await this.dbService.review.delete({
      where: { id },
    })
  }
}
