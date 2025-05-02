import { Controller, Get, UseGuards, Query, Patch, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { usersSearchDto } from './dto/usersSearch-dto';
import { UserRoles } from 'src/types/types';
import { RolesGuard } from 'src/auth/strategies/roles.strategy';
import { Roles } from '@/decorators/roles.decorator';
import { Update } from 'nestjs-telegraf';


@Controller('admin')
@UseGuards(RolesGuard, JwtAuthGuard)
// @Roles(UserRoles.admin, UserRoles.superAdmin)
export class AdminController {
  constructor(private readonly usersService: UsersService) { }

  @Get("users")
  async findAllUsers(@Query('query') queryJSON: string) {
    console.log('test')
    // console.log(queryJSON)
    // const query: usersSearchDto = queryJSON ? JSON.parse(queryJSON) : {}
    return await this.usersService.findAllUsers()
  }


  @Patch('users/update-rights')
  async updateUserRights(@Body() body: { telegramId: number }) {
    console.log(body)

    return await this.usersService.updateUserRights(body.telegramId)
  }


  // @Get(':id')
  // async getDetailedData(@Param('id') id: string) {
  //   return await this.usersService.getDetailedData(id);
  // }



  // @Patch("/ban/switch/:id")
  // async switchBanAdmins(@Param("id") id: string) {
  //   return await this.usersService.switchBanUser(id)

  // }

}

