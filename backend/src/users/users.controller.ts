import {
  Controller,
  Post,
  Body,
  Headers,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('onboarding')
  async setupProfile(
    @Headers('authorization') authHeader: string,
    @Body() data: any,
  ) {
    if (!authHeader) throw new UnauthorizedException('Brak tokenu w nagłówku');

    let userId: string;

    try {
      const token = authHeader.split(' ')[1].replace(/"/g, '');
      const decoded = this.jwtService.verify(token);
      userId = decoded.sub;
    } catch (error) {
      throw new UnauthorizedException('Nieprawidłowy token JWT');
    }

    try {
      return await this.usersService.completeOnboarding(userId, data);
    } catch (dbError) {
      console.error('❌ BŁĄD BAZY DANYCH:', dbError);
      throw new InternalServerErrorException(
        'Wystąpił problem podczas zapisu do bazy danych',
      );
    }
  }

  @Get('me')
  async getProfile(@Headers('authorization') authHeader: string) {
    if (!authHeader) throw new UnauthorizedException('Brak tokenu w nagłówku');

    try {
      const token = authHeader.split(' ')[1].replace(/"/g, '');
      const decoded = this.jwtService.verify(token);

      return await this.usersService.getUserProfile(decoded.sub);
    } catch (error) {
      throw new UnauthorizedException('Nieprawidłowy token JWT');
    }
  }
}
