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
        example: 'f5a88e1a-5b8f-4c92-85ff-3c4c0f7af3b9',
    })
    @IsNotEmpty()
    @IsString()
    booking_id: string
}