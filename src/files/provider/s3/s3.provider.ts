import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk'
import { UploadFileDto } from 'src/files/dto/upload-file.dto';
AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,

})
@Injectable()
export class S3Provider {
    s3= new AWS.S3()
    
    constructor(){}

    uploadFile(body:UploadFileDto){
        const params ={
            
        }

        this.s3.upload(params)
    }
}
