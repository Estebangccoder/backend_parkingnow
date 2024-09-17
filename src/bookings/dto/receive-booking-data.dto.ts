import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate, IsString, IsDateString, isDate, Matches, IsISO8601 } from 'class-validator';

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
        description: "Owner ID",
        example: '3f33ba0b-c4fe-4640-b655-7c5a99cbec10',
    })
    @IsNotEmpty()
    @IsString()
    owner_id: string;

    @ApiProperty({
        description: "driver ID",
        example: '0a34aa48-7e96-4601-8357-f7418127d54c',
    })
    @IsNotEmpty()
    @IsString()
    driver_id: string;

    @ApiProperty({
        description: "Slot ID",
        example: 'b11b9cd7-c707-4ef8-b0c5-9f74f3f8a9c5',
    })
    @IsNotEmpty()
    @IsString()
    slot_id: string;
}