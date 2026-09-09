import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service.js';
import { RateLimitGuard } from './guards/rate-limit.guard.js';

@Controller('ping')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(RateLimitGuard)
  pingServer() {
    return {
      statusCode: 200,
      message: 'Request hợp lệ.',
    };
  }
}
