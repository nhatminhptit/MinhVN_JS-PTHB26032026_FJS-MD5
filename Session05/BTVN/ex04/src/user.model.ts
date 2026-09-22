import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { EmailScalar } from './email.scalar.js';

@ObjectType()
export class UserResponse {
  @Field(() => ID)
  id: string;

  @Field(() => EmailScalar)
  email: string;
}

@InputType()
export class CreateUserInput {
  @Field(() => EmailScalar)
  email: string;
}
