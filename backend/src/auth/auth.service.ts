import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { DatabaseService } from '@/database/database.service';
import { adminTelegramIds } from '@/types/types';
import { UsersService } from '@/users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  private readonly encryptionKey: Buffer;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {
    this.encryptionKey = Buffer.from(
      this.configService.get<string>('ENCRYPTION_KEY'),
      'base64',
    );
  }


  async login(user: any) {
    const { id, telegramId, firstName, username, role, hasAccess, config } = user;

    return {
      user,
      token: this.jwtService.sign({ id, telegramId, username, role, hasAccess }),
    };
  }


  hasUserRight(telegramId: number): boolean {


    if(adminTelegramIds.includes(telegramId)) return true

    return adminTelegramIds.includes(telegramId)

  }

  async handleExistingUser(user, organization) {
    if (user.banned) throw new UnauthorizedException('You are banned')
    return { verified: true };
  }
}
