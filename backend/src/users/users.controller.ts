import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthTonnelData } from './dto/user-data-dto';
import { TelegramService } from '@/telegram/telegram.service';
import { UserId } from '@/decorators/userid.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

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


  @UseGuards(JwtAuthGuard)
  @Get('giftMessages')
  async getHiddenMessages(@UserId() userId: string) {
    return await this.usersService.getUserSortedMessages(userId)
  }


 


}
