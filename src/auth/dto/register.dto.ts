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
    phone: number;

    @IsString()
    address: string;

    @IsNumber()
    num_doc: number;
}