import { Controller, Get, Inject } from '@nestjs/common';
import { APP_CONFIG } from './config.constants.js';

@Controller()
export class AppController {
  constructor(@Inject(APP_CONFIG) private readonly configInfo: any) {}

  @Get('info')
  getInfo() {
    return this.configInfo;
  }
}
