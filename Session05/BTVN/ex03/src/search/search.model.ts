import { Field, ID, ObjectType, createUnionType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}

export const SearchResultUnion = createUnionType({
  name: 'SearchResultUnion',
  types: () => [Post, User] as const,
});
