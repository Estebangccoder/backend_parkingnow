import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsString, MinLength,  } from "class-validator";


export class RegisterDto {
    @IsString()
    fullName: string;
    
    @IsEmail()
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

    @IsNumber()
    phone: number;

    @IsString()
    address: string;
    
    @IsString()
    id_typedoc:string

    @IsNumber()
    num_doc: number;
}