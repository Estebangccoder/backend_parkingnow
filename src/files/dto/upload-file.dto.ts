import { IsBase64, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class UploadFileDto{

    @IsNotEmpty()
    @IsString()
    readonly fileName: string;

    @IsNotEmpty()
    @IsBase64()
    readonly file: string;
}