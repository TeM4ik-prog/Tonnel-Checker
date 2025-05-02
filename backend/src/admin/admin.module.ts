import { Module, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/auth/strategies/roles.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    JwtModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, RolesGuard],
  exports: [AdminService],

})
export class AdminModule { }
