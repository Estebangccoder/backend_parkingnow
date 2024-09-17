import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class LoginDto {
    @ApiProperty({
        description: 'User email address',
        example: 'admin@example.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'admin123'
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}
