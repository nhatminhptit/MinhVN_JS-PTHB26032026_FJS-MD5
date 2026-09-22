import { Controller, Get, Query } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto.js';

@Controller('products')
export class AppController {
  @Get()
  getList(@Query() query: PaginationDto) {
    console.log('Dữ liệu query:', query);
    console.log('Kiểu của page:', typeof query.page);
    console.log('Kiểu của limit:', typeof query.limit);

    return {
      message: 'Lấy danh sách thành công',
      data: query,
    };
  }
}
