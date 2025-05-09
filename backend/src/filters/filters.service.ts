import { DatabaseService } from '@/database/database.service';
import { IFilters } from '@/types/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FiltersService {
  constructor(private readonly database: DatabaseService){}


  async getUserFilters(userId: string){
    return await this.database.filter.findMany({
      where:{
        UsersConfig:{
          userId
        }
      }
    })

  }



  async applyFilters(filters: IFilters[], userId: string) {
    // Удаляем существующие фильтры пользователя
    await this.database.filter.deleteMany({
      where: {
        UsersConfig: {
          userId
        }
      }
    });

    // Проверяем существование конфигурации пользователя
    const userConfig = await this.database.usersConfig.findUnique({
      where: { userId }
    });

    if (!userConfig) {
      // Если конфигурации нет, создаем новую
      return await this.database.usersConfig.create({
        data: {
          userId,
          filters: {
            create: filters.map(filter => ({
              ...filter
            }))
          }
        },
        include: {
          filters: true
        }
      });
    }

    return await this.database.usersConfig.update({
      where: {
        userId
      },
      data: {
        filters: {
          create: filters.map(filter => ({
            ...filter
          }))
        }
      },
      include: {
        filters: true
      }
    });
  }
}
