import { Controller, Body, Post, Res, HttpStatus } from '@nestjs/common';
import { UploadFileDto } from './dto/upload-file.dto';
import{Response} from 'express';
import {FilesService} from './files.service';


@Controller('files')
export class FilesController {

    constructor(
        private fileService: FilesService, 
    ){

    }

    @Post('upload-file')
    async uploadFile(@Body() body:UploadFileDto, @Res() res: Response){
        try{
            const response = await this.fileService.uploadFile(body)
            res.status(HttpStatus.OK).send(response)


        }catch(error){

            throw error
        }
    }
    }
