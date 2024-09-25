

import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid'; // Para generar nombres únicos

@Injectable()
export class UploadService {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION, // Asegúrate de tener esta variable en tus env
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuid()}-${file.originalname}`;
    const params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.S3_BUCKET,
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
