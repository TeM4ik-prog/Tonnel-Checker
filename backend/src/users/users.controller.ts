import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserId } from '@/userid.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/user-data-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }



  @Patch()
  @UseGuards(JwtAuthGuard)
  changeName(@Body() body: UpdateUserDto, @UserId() userId: string) {
    console.log('changeName', body, userId);
    return this.usersService.changeName(body.newName, userId);

  }
  
}
