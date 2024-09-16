import { IsNotEmpty, IsDate, IsString, IsDateString, isDate, Matches } from 'class-validator';
export class CreateBookingDto {
    @IsNotEmpty()
    @IsDate()
    start_date_time: Date;

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

    constructor(
        start_date_time: Date, 
        vehicle_plate: string, 
        owner_id: string, 
        driver_id: string,
        slot_id: string
     ){
        this.start_date_time = start_date_time;
        this.vehicle_plate = vehicle_plate;
        this.owner_id = owner_id;
        this.driver_id = driver_id;
        this.slot_id = slot_id;
    }
}
