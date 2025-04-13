import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';

@Injectable()
export class UsersService {
  constructor(private database: DatabaseService) { }

  async findUserById(userBaseId: string) {
    return await this.database.user.findUnique({
      where: { id: userBaseId },
    });
  }


}






