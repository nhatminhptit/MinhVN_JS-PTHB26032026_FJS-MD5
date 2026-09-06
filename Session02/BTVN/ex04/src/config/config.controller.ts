import { Controller } from '@nestjs/common';
import { ConfigService } from './config.service.js';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}
}
