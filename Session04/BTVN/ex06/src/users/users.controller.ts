import {
  Controller,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import * as fs from 'fs';

@Controller('users')
export class UsersController {
  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadAvatar(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2 * 1024 * 1024,
            message: 'Dung lượng file không được vượt quá 2MB',
          }),
          new FileTypeValidator({
            fileType: 'image/(jpeg|png)',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const uploadFolder = './uploads';
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }

    const filePath = `${uploadFolder}/${Date.now()}-${file.originalname}`;
    fs.writeFileSync(filePath, file.buffer);

    return {
      message: 'Upload ảnh đại diện thành công',
      userId: id,
      fileInfo: {
        filename: file.originalname,
        path: filePath,
        mimetype: file.mimetype,
        size: file.size,
      },
    };
  }
}
