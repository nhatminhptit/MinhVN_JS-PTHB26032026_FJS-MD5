import { Resolver, Query } from '@nestjs/graphql';
import { Product, ProductStatus } from './product.model.js';

@Resolver(() => Product)
export class ProductResolver {
  @Query(() => [Product], { name: 'products' })
  getProducts(): Product[] {
    return [{ id: '1', name: 'Laptop Gaming', status: ProductStatus.IN_STOCK }];
  }
}
