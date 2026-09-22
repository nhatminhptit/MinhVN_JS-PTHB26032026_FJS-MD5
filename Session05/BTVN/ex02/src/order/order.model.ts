import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateOrderItemInput {
  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  quantity: number;
}

@InputType()
export class CreateOrderInput {
  @Field()
  customerName: string;

  @Field(() => [CreateOrderItemInput])
  items: CreateOrderItemInput[];
}

@ObjectType()
export class OrderItemResponse {
  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  quantity: number;
}

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field()
  customerName: string;

  @Field(() => [OrderItemResponse])
  items: OrderItemResponse[];
}
