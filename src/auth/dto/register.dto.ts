import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsString, MinLength,  } from "class-validator";


export class RegisterDto {
    @IsString()
    fullname: string;
 
    @IsEmail()
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    phone_number: string;

    @IsString()
    address: string;
    
    @IsNumber()
    document_type_id:number

    @IsString()
    doc_number: string;

    @IsNumber()
    role_id: number;
}