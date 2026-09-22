import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PostResolver } from './post.resolver.js';
import { DatabaseModule } from './database.module.js';
import { DatabaseService } from './database.service.js';
import { createAuthorLoader } from './author.loader.js';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DatabaseModule],
      inject: [DatabaseService],
      useFactory: (databaseService: DatabaseService) => ({
        autoSchemaFile: join(process.cwd(), 'schema.gql'),
        playground: true,
        context: () => ({
          authorLoader: createAuthorLoader(databaseService),
        }),
      }),
    }),
  ],
  providers: [PostResolver],
})
export class AppModule {}
