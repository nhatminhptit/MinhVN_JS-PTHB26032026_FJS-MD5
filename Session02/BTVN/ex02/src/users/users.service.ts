import { Injectable } from '@nestjs/common';
import { LoggerService } from '../core/logger/logger.service.js';
import { DatabaseService } from '../core/database/database.service.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: LoggerService,
    private readonly database: DatabaseService,
  ) {
    console.log('UsersService đang khởi tạo');
    console.log('Test Logger:', this.logger);
    console.log('Test Database:', this.database);
  }
}
