import { IsBase64, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class UploadFileDto{

    @IsNotEmpty()
    @IsString()
    @IsBase64()
    readonly filename: string;

    @IsNotEmpty()
    @IsBase64()
    readonly file: string;
}