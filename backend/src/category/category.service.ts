import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DatabaseService } from '@/database/database.service';
import { Prisma } from '@prisma/client';
import { CategoriesEnum } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(
    protected dbService: DatabaseService
  ) { }

  async onCreateCategories() {
    const categories = Object.values(CategoriesEnum);
    const existingCategories = await this.findAll()

    for (const category of categories) {
      const existingCategory = await this.findOneByName(category);
      // console.log(category)

      if (!existingCategory) {
        await this.create({ name: category });
      }
    }

    for (const existingCategory of existingCategories) {
      if (!categories.includes(existingCategory.name as CategoriesEnum)) {
        await this.delete(existingCategory.id);
      }
    }
  }



  async create(createCategoryDto: Prisma.CategoryCreateInput) {
    return await this.dbService.category.create({
      data: createCategoryDto,
    })
  }

  async findAll() {
    return await this.dbService.category.findMany()
  }

  async findOneById(id: string) {
    return await this.dbService.category.findUnique({ where: { id } })
  }

  async findOneByName(name: string) {
    return await this.dbService.category.findUnique({ where: { name } })
  }



  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async delete(id: string) {
    return await this.dbService.category.delete({ where: { id }})
  }
}
