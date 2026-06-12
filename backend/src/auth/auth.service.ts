import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    console.log('Dane przychodzące do logowania:', loginDto);

    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Nieprawidłowe dane logowania (brak usera)',
      );
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Nieprawidłowe dane logowania (złe hasło)',
      );
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(loginDto: LoginDto) {
    const hashedPassword = await bcrypt.hash(loginDto.password, 10);

    return this.prisma.user.create({
      data: {
        email: loginDto.email,
        passwordHash: hashedPassword,
        firstName: 'Admin',
      },
    });
  }
}
