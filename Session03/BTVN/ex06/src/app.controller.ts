import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createUser() {
    const pgError = new Error(
      'duplicate key value violates unique constraint "users_email_key"',
    );
    (pgError as any).code = '23505';

    throw pgError;
  }
}
