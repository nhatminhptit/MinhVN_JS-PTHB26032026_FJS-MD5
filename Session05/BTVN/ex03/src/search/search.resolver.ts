import { Query, Resolver } from '@nestjs/graphql';
import { Post, SearchResultUnion, User } from './search.model.js';

@Resolver()
export class SearchResolver {
  @Query(() => [SearchResultUnion])
  search(): Array<typeof SearchResultUnion> {
    const post = new Post();
    post.id = 'p1';
    post.title = 'NestJS GraphQL Union Types';

    const user = new User();
    user.id = 'u1';
    user.name = 'Vu Nhat Minh';

    return [post, user];
  }
}
