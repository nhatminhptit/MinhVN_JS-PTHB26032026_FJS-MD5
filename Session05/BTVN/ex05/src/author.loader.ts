import DataLoader from 'dataloader';
import { Author } from './author.model.js';
import { DatabaseService } from './database.service.js';

export function createAuthorLoader(databaseService: DatabaseService) {
  return new DataLoader<string, Author>(async (keys: readonly string[]) => {
    return databaseService.getAuthorsByIds(keys);
  });
}
