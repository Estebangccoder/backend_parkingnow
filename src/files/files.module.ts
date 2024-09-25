// import { Module } from '@nestjs/common';
// import { FilesController } from './files.controller';
// import { FilesService } from './files.service';
// import { S3Provider } from './provider/s3/s3.provider';

// @Module({
//   controllers: [FilesController],
//   providers: [FilesService, S3Provider]
// })
// export class FilesModule {}


import { Module } from '@nestjs/common';
import { UploadController } from './files.controller';
import { UploadService } from './files.service';


@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
