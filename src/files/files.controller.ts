import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './files.service';

@Controller('uploads')
export class UploadController {
  constructor(private readonly awsS3Service: UploadService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file provided');
    }
    const uploadResult = await this.awsS3Service.uploadFile(file);
    return { url: uploadResult };
  }
}