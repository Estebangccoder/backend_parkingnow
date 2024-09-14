import { IsNotEmpty, IsDate, IsString, IsDateString, isDate, Matches } from 'class-validator';

export class CreateBookingDto {

    @IsNotEmpty()
    @IsDate()
    start_date_time: Date;
    // @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    //     message: 'date must be in the format YYYY-MM-DD',
    //   })
    // @IsNotEmpty()
    // @IsString()
    // @Matches(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    //     message: 'time must be in the format HH:MM:SS',
    //   })
    // start_time: string;

    @IsNotEmpty()
    @IsString()
    vehicle_plate: string;

    @IsNotEmpty()
    @IsString()
    owner_id: string;

    @IsNotEmpty()
    @IsString()
    driver_id: string;

    @IsNotEmpty()
    @IsString()
    slot_id: string;
}
