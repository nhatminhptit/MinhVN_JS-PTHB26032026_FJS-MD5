import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        console.log('Đang kết nối tới Database bên thứ 3...');

        await delay(3000);

        console.log('Kết nối thành công! Cho phép server khởi động.');

        return { status: 'Connected', host: 'localhost', port: 5432 };
      },
    },
  ],
})
export class AppModule {}
