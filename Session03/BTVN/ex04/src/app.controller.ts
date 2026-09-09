import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service.js';
import { OwnershipGuard } from './guards/ownership.guard.js';

@Controller('posts')
export class AppController {
  @Delete(':id')
  @UseGuards(OwnershipGuard)
  deletePost(@Param('id') id: string) {
    return {
      statusCode: 200,
      message: `Bạn xóa thành công bài viết số ${id}!`,
    };
  }
}
