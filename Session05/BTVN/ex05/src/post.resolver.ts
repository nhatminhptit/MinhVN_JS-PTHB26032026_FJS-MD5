import {
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from './post.model.js';
import { Author } from './author.model.js';
import { DatabaseService } from './database.service.js';
import * as DataLoader from 'dataloader';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  @Query(() => [Post])
  posts(): Post[] {
    return this.databaseService.getPosts();
  }

  @ResolveField(() => Author)
  async author(
    @Parent() post: Post,
    @Context('authorLoader') authorLoader: DataLoader<string, Author>,
  ): Promise<Author> {
    return authorLoader.load(post.authorId);
  }
}
