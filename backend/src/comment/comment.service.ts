import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DatabaseService } from '@/database/database.service';

@Injectable()
export class CommentService {

  constructor(
    protected dbService: DatabaseService
  ) { }


  async create(text: string, sourcePath: string) {
    console.log(text, sourcePath)


    return await this.dbService.comment.create({
      data: {
        content: text,
        sourceUrl: sourcePath,
      },
    })
  }


  async findAll() {
    return await this.dbService.comment.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async findAllMy(userId: string) {
    return await this.dbService.comment.findMany({
      // where: {
        
      // },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }



  async findOne(id: string) {
    return `This action returns a #${id} comment`;
  }

  async update(id: string, updateReviewDto: UpdateCommentDto) {
    console.log(id, updateReviewDto)

    return await this.dbService.comment.update({
      where: {
        id,
      },
      data: updateReviewDto,
    })
  }

  async remove(id: string) {
    return await this.dbService.comment.delete({
      where: { id },
    })
  }
}
