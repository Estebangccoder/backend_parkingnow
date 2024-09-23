import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { S3Provider } from './provider/s3/s3.provider';

@Module({
  controllers: [FilesController],
  providers: [FilesService, S3Provider]
})
export class FilesModule {}
