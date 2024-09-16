import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { RegisterDto } from 'src/auth/dto/register.dto';


export class UpdateUserDto extends PartialType(RegisterDto) {

    @ApiProperty({
        description: 'User role ID',
        example: 2
    })
    @IsOptional()
    @IsNumber()
    role_id?: number;
}
