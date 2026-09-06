import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { APP_CONFIG, config } from './config.constants.js';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: config,
    },
  ],
})
export class AppModule {}
