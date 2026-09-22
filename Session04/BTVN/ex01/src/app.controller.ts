import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';

@Controller()
export class AppController {
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return {
      message: 'Đăng ký thành công!',
      data: createUserDto,
    };
  }
}
