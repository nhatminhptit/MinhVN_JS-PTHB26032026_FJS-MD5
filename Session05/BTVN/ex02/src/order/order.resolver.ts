import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOrderInput, Order } from './order.model.js';

@Resolver(() => Order)
export class OrderResolver {
  @Query(() => String)
  ping(): string {
    return 'pong';
  }

  @Mutation(() => Order)
  createOrder(@Args('input') createOrderInput: CreateOrderInput): Order {
    const newOrder: Order = {
      id: Date.now().toString(),
      customerName: createOrderInput.customerName,
      items: createOrderInput.items,
    };
    return newOrder;
  }
}
