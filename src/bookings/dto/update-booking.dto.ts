import { IsNotEmpty, IsDate, IsNumber } from "class-validator";

export class UpdateBookingDto {
    @IsNotEmpty()
    @IsNumber()
    rented_hours: number;

    @IsNotEmpty()
    @IsDate()
    end_date_time: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}
