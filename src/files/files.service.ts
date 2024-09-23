import { Injectable } from '@nestjs/common';
import {UploadFileDto} from './dto/upload-file.dto'
import { S3Provider } from './provider/s3/s3.provider';

@Injectable()
export class FilesService {

    constructor(
        private s3Provider:S3Provider
    ){}

    uploadFile(body:UploadFileDto){
        const {file, filename} =body
    }

}
