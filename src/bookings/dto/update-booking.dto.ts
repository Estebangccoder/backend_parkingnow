import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UpdateBookingDto {
    @IsNotEmpty()
    @IsNumber()
    rented_hours: number;

    @IsNotEmpty()
    @IsString()
    end_date: string;

    @IsNotEmpty()
    @IsString()
    end_time: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}
