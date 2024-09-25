import { Module } from '@nestjs/common';
import { UploadController } from './files.controller';
import { UploadService } from './files.service';


@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
