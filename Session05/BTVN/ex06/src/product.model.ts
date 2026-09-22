import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}

@InputType()
export class CreateProductInput {
  @Field()
  name: string;
}
