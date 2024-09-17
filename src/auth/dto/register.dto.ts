import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({
        description: 'Full name of the user',
        example: 'Admin de prueba'
    })
    @IsString()
    fullname: string;

    @ApiProperty({
        description: 'User email address',
        example: 'prueba@example.com'
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

    @ApiProperty({
        description: 'User phone number',
        example: '3216549870'
    })
    @IsString()
    phone_number: string;

    @ApiProperty({
        description: 'User address',
        example: 'Riwi'
    })
    @IsString()
    address: string;

    @ApiProperty({
        description: 'Document type ID',
        example: 1
    })
    @IsNumber()
    document_type_id: number;

    @ApiProperty({
        description: 'Document number',
        example: '12345678910'
    })
    @IsString()
    doc_number: string;

}
