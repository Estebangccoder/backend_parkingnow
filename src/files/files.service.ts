import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadService {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: 'AKIAZVMTVLDPCFCYD4HG',
      secretAccessKey: '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',
      region: 'us-east-2', 
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuid()}-${file.originalname}`;
    const params: AWS.S3.PutObjectRequest = {
      Bucket: 'imagesparkinnow-2024aws',
      Key: fileName,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    };

    try {
      const { Location } = await this.s3.upload(params).promise();
      return Location; // URL del archivo subido
    } catch (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
  }
}
