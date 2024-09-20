
import { IsNotEmpty, IsDate, IsNumber } from "class-validator";

export class TerminateBookingDto {
    @IsNotEmpty()
    @IsDate()
    end_date_time: Date;

    @IsNotEmpty()
    @IsNumber()
    rented_hours: number;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsNumber()
    booking_state_id: number;

    constructor(
        end_date_time: Date,
        rented_hours: number,
        amount: number,
        booking_state_id: number
    ){
        this.end_date_time = end_date_time;
        this.rented_hours = rented_hours;
        this.amount = amount;
        this.booking_state_id = booking_state_id
    }
}
