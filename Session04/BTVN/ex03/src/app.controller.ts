import { Body, Controller, Put } from '@nestjs/common';
import { UpdatePostWithPrivilegesDto } from './dto/post.dto.js';

@Controller('posts')
export class AppController {
  @Put('update')
  updatePost(@Body() payload: UpdatePostWithPrivilegesDto) {
    return {
      message: 'Đã nhận được dữ liệu gộp',
      receivedData: payload,
    };
  }
}
