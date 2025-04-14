import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthTonnelData } from './dto/user-data-dto';
import { TelegramService } from '@/telegram/telegram.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    
  ) { }

  @Post('authData')
  async getAuthData(@Body() body: { initData: string }) {
    // console.log(body)


    const authData: AuthTonnelData = this.usersService.decodeInitData(body.initData); 

    console.log(authData)


    return await this.usersService.updateUserAuthTonnelData(authData.user.id, body.initData)

    // console.log(body)
    return { status: 'ok!' }
  }


}
