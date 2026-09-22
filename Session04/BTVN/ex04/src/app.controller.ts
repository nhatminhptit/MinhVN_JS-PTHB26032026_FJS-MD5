import { Body, Controller, Post } from '@nestjs/common';
import { CreateEventDto } from './dto/event.dto.js';

@Controller('events')
export class AppController {
  @Post()
  createEvent(@Body() payload: CreateEventDto) {
    return {
      message: 'Tạo sự kiện thành công!',
      data: payload,
    };
  }
}
