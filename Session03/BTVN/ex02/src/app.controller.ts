import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import { InsufficientFundsException } from './exceptions/insufficient-funds.exception.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("transfer")
  transferMoney(@Body() body: { amount: number; balance: number }) {
    const { amount, balance } = body;

    if (amount > balance) {
      throw new InsufficientFundsException();
    }

    return {
      statusCode: 200,
      message: 'Chuyển tiền thành công!',
      remainingBalance: balance - amount,
    };
  }
}
