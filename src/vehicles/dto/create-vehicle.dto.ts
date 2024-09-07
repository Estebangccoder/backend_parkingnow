import {IsNotEmpty, IsNumber, IsString, Length} from 'class-validator';


export class CreateVehicleDto{
    @IsNotEmpty()
    @IsNumber()
    driver_id: number;

    @IsNotEmpty()
    @IsNumber()
    vehicle_type_id: number;

    @IsNotEmpty()
    @IsString()
    plate: string;
}