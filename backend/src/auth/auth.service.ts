import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@/users/users.service';
import { DatabaseService } from '@/database/database.service';
import { IBasicUser } from '@/types/types';


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

  

  async login(user: IBasicUser) {
    const { id, role } = user;
    // const { email } = user.EmailUser
    return {
      user,
      token: this.jwtService.sign({ id, role }),
    };
  }

  async handleExistingUser(user, organization) {
    if (user.banned) throw new UnauthorizedException('You are banned')
    return { verified: true };
  }
}
