import {IsNotEmpty, isString, IsISO8601, IsString} from 'class-validator';

export class EndDateDataDto{
    @IsNotEmpty()
    @IsISO8601()
    end_date_time: string

    @IsNotEmpty()
    @IsString()
    booking_id: string
}