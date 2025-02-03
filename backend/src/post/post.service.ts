import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { DatabaseService } from '@/database/database.service';
import { CategoryService } from '@/category/category.service';

@Injectable()
export class PostService {


  constructor(
    protected dbService: DatabaseService,
    protected categoryService: CategoryService
  ) { }
  async create(data: { createPostDto: CreatePostDto, imagePath: string }) {
    const category = await this.categoryService.findOneByName(data.createPostDto.category)
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const {content, title, date} = data.createPostDto



    await this.dbService.post.create({
      data: {
        content,
        title,
        date,
        imageUrl: data.imagePath,
        categoryId: category.id,
      },



    })
  }

  async findAll(categoryName: string) {
    const category = await this.categoryService.findOneByName(categoryName)

    return await this.dbService.post.findMany({
      where: {
        categoryId: category.id,
        
      },
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto) {
    return `This action updates a #${id} post`;
  }

  async delete(id: string) {
    return await this.dbService.post.delete({
      where: {
        id,
      },
    })
  }
}
