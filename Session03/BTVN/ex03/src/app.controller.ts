import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUsers() {
    return [
      { id: 1, name: 'Nguyen Van A' },
      { id: 2, name: 'Tran Thi B' },
    ];
  }
}
