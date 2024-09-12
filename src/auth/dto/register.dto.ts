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

    @IsNumber()
    phone_number: number;

    @IsString()
    address: string;
    
    @IsString()
    id_typedoc:string

    @IsString()
    document_type_id:string

    @IsNumber()
    doc_number: number;

    @IsNumber()
    role_id: number;
}