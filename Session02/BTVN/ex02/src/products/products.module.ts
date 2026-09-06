import { Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CoreModule } from '../core/core.module.js';

@Module({
  imports: [CoreModule],
  providers: [ProductsService],
})
export class ProductsModule {}
