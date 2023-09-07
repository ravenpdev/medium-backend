import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll() {
    return this.usersRepository.find({});
  }

  async create(createUserDto: CreateUserDto) {
    await this.validateEmail(createUserDto.email);

    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async getUser(getUser: GetUserDto) {
    return await this.usersRepository.findOne(getUser);
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersRepository.findOne({ email });

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid credentilas');
    }
  }

  private async validateEmail(email: string) {
    try {
      await this.usersRepository.findOne({ email });
    } catch (err) {
      return;
    }

    throw new BadRequestException('Email already exists.');
  }
}
