import {IsNotEmpty, IsString} from 'class-validator';

export class DeleteVehicleDto{
    @IsNotEmpty()
    @IsString()
    id: string
}