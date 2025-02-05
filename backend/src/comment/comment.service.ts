import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DatabaseService } from '@/database/database.service';
import { UsersService } from '@/users/users.service';

@Injectable()
export class CommentService {

  constructor(
    protected dbService: DatabaseService,
    protected readonly userService: UsersService
  ) { }


  async create(text: string, sourcePath: string, userId: string) {

    const user = await this.userService.findUserById(userId)
    if (!user) throw new NotFoundException('User Not Found')

    console.log(text, sourcePath, user)


    return await this.dbService.comment.create({
      data: {
        content: text,
        sourceUrl: sourcePath,
        userBaseId: user.id
      },
    })
  }


  async findAll() {
    return await this.dbService.comment.findMany({
      include: {
        UserBase: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async findAllMy(userBaseId: string) {
    return await this.dbService.comment.findMany({
      where: {
        userBaseId: userBaseId
      },
      include: {
        UserBase: true
      },
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

  async updateUserComment(id: string, updateReviewDto: UpdateCommentDto, userId: string) {
    const comment = await this.dbService.comment.findUnique({
      where: { id },
    })

    if (!comment) throw new NotFoundException('Комментарий не найден')

    if (comment.userBaseId !== userId) throw new ForbiddenException('Вы не можете редактировать этот комментарий')

    return await this.dbService.comment.update({
      where: { id },
      data: updateReviewDto,
    });
  }


  async remove(id: string) {
    return await this.dbService.comment.delete({
      where: { id },
    })
  }

  async removeUserComment(id: string, userId: string) {
    const comment = await this.dbService.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }

    if (comment.userBaseId !== userId) {
      throw new ForbiddenException('Вы не можете удалить этот комментарий');
    }

    return await this.dbService.comment.delete({
      where: { id },
    });
  }
}
