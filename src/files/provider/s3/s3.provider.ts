import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk'
import { UploadFileDto } from 'src/files/dto/upload-file.dto';
@Injectable()
export class S3Provider {
    s3: AWS.S3
    
    constructor(){
        AWS.config.update({
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        
        })
        
        this.s3 = new AWS.S3()
    }
   
   async  uploadFile(body:UploadFileDto){
        
        const {file, fileName} = body
        
        const decodeFile = Buffer.from(file, 'base64')

        const params ={
            Bucket: process.env.S3_BUCKET,
            Key: `/files/${fileName}`,
            ACL: 'public-read',
            Body: decodeFile
        }
        try{
            const responseS3 = await this.s3.upload(params).promise()
            return responseS3
        }catch(error){
            error
        }

        
    }
}
