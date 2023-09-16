import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from './users/models/user.schema';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(user: User, response: Response) {
    const { token, expires } = this.generateToken(user);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    response.statusCode = HttpStatus.OK;

    return {
      token,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    const { token } = this.generateToken(user);

    return {
      token,
    };
  }

  async logout(response: Response) {
    response.clearCookie('Authentication');
    response.statusCode = HttpStatus.OK;
  }

  private generateToken(user: User): { token: string; expires: Date } {
    const tokenPayload: ITokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    return { token, expires };
  }
}
