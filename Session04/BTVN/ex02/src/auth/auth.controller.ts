import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: Record<string, string>) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  login(@Body() body: Record<string, string>) {
    return this.authService.login(body.username, body.password);
  }
}
