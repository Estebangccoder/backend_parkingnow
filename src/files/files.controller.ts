// import { Controller, Body, Post, Res, HttpStatus } from '@nestjs/common';
// import { UploadFileDto } from './dto/upload-file.dto';
// import{Response} from 'express';
// import {FilesService} from './files.service';


// @Controller('files')
// export class FilesController {

//     constructor(
//         private fileService: FilesService, 
//     ){

//     }

//     @Post('upload-file')
//     async uploadFile(@Body() body:UploadFileDto, @Res() res: Response){
//         try{
//             const response = await this.fileService.uploadFile(body)
//             res.status(HttpStatus.OK).send(response)


//         }catch(error){

//             throw error
//         }
//     }
//     }

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