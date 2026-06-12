import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('Co dostał kontroler:', loginDto); // <--- ZOBACZ TO W TERMINALU BACKENDU
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() loginDto: LoginDto) {
    return this.authService.register(loginDto);
  }
}
