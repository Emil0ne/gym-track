import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(
      createUserDto.passwordHash,
      saltOrRounds,
    );

    const newUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        passwordHash: 'jakis-hash',
        lastName: 'Brak',
        dateOfBirth: new Date(),
      },
    });

    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }
  findOne(id: string) {
    return `This action returns a #${id} user`;
  }
  update(id: string, updateDto: any) {
    return `This action updates a #${id} user`;
  }
  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
