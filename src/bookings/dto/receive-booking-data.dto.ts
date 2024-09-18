import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsISO8601 } from 'class-validator';

export class ReceiveBookingDataDto {
    @ApiProperty({
        description: 'Start date',
        example: '2024-09-15T10:30:00Z',
    })
    @IsNotEmpty()
    @IsISO8601()
    start_date_time: string;

    @ApiProperty({
        description: 'Vehicle plate',
        example: 'JWT666',
    })
    @IsNotEmpty()
    @IsString()
    vehicle_plate: string;

    @ApiProperty({
        description: "Slot ID",
        example: 'b0c9a631-d87f-4ce7-a837-fded62ee8450',
    })
    @IsNotEmpty()
    @IsString()
    slot_id: string;
}