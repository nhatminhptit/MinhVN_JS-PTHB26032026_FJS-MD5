import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CoreModule } from '../core/core.module.js'; 

@Module({
  imports: [CoreModule], 
  providers: [UsersService],
})
export class UsersModule {}
