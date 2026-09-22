import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Author } from './author.model.js';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  authorId: string;

  @Field(() => Author)
  author: Author;
}
