import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CreateProductInput, Product } from './product.model.js';
import { Subject } from 'rxjs';

const productSubject = new Subject<any>();

@Resolver(() => Product)
export class ProductResolver {
  @Query(() => String)
  ping(): string {
    return 'pong';
  }

  @Mutation(() => Product)
  createProduct(@Args('input') input: CreateProductInput): Product {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: input.name,
    };

    productSubject.next({ productAdded: newProduct });

    return newProduct;
  }

  @Subscription(() => Product)
  productAdded() {
    return productSubject.asObservable();
  }
}
