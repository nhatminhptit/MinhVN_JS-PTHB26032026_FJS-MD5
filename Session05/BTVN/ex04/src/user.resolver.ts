import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, UserResponse } from './user.model.js';

@Resolver()
export class UserResolver {
  @Query(() => String)
  ping(): string {
    return 'pong';
  }

  @Mutation(() => UserResponse)
  createUser(@Args('input') input: CreateUserInput): UserResponse {
    return {
      id: Date.now().toString(),
      email: input.email,
    };
  }
}
