import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor(@Inject('CONFIG_OPTIONS') private options: { folder: string }) {}

  getFolderInfo(): string {
    return `Thư mục hiện tại đang trỏ tới là: ${this.options.folder}`;
  }
}
