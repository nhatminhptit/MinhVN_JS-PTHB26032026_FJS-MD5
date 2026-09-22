import { Injectable } from '@nestjs/common';
import { Author } from './author.model.js';
import { Post } from './post.model.js';

@Injectable()
export class DatabaseService {
  private authors: Author[] = [
    { id: '1', name: 'Author One' },
    { id: '2', name: 'Author Two' },
  ];

  private posts: Post[] = Array.from({ length: 100 }).map((_, i) => ({
    id: `p${i + 1}`,
    title: `Post ${i + 1}`,
    authorId: i % 2 === 0 ? '1' : '2',
    author: null as any,
  }));

  getPosts(): Post[] {
    console.log('SELECT * FROM posts LIMIT 100');
    return this.posts;
  }

  getAuthorsByIds(ids: readonly string[]): Author[] {
    console.log(`SELECT * FROM authors WHERE id IN (${ids.join(', ')})`);
    return ids.map((id) => this.authors.find((a) => a.id === id) as Author);
  }
}
