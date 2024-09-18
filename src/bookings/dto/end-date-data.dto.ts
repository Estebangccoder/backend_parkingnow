import {IsNotEmpty, IsISO8601, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EndDateDataDto{
    
    @ApiProperty({
        description: 'end date',
        example: '2024-09-15T10:30:00Z',
    })
    @IsNotEmpty()
    @IsISO8601()
    end_date_time: string

    @ApiProperty({
        description: 'Booking ID',
        example: 'bb926c5a-dc35-4c3e-95fa-f25540a51b7f',
    })
    @IsNotEmpty()
    @IsString()
    booking_id: string
}