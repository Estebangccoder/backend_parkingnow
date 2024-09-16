
import { IsNotEmpty, IsDate, IsNumber } from "class-validator";

export class UpdateBookingDto {
    @IsNotEmpty()
    @IsDate()
    end_date_time: string;

    @IsNotEmpty()
    @IsNumber()
    rented_hours: number;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsNumber()
    booking_state_id: number;
}
