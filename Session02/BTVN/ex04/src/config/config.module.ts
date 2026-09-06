import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service.js';

@Module({})
export class ConfigModule {
  static forRoot(options: { folder: string }): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
