import { Controller, Get, UseGuards, Query, Patch, Body, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { RolesGuard } from 'src/auth/strategies/roles.strategy';
import { RequestStatus, UserRoles } from '@prisma/client';
import { AdminService } from './admin.service';
import { Roles } from '@/decorators/roles.decorator';
@Controller('admin')


@UseGuards(RolesGuard, JwtAuthGuard)
@Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminService: AdminService
  ) { }

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

  @Get('users/access-requests/:status')
  async getAccessRequests(@Param('status') status: RequestStatus) {
    return await this.adminService.getAccessRequests(status)
  }

  @Patch('users/access-requests/approve/:id')
  async approveAccessRequest(@Param('id') id: string) {
    console.log(id)
    return await this.adminService.approveAccessRequest(id)
  }

  @Patch('users/access-requests/reject/:id')
  async rejectAccessRequest(@Param('id') id: string) {
    return await this.adminService.rejectAccessRequest(id)
  }
}

