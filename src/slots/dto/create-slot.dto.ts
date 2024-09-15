import {
    IsBoolean,
    IsBooleanString,
    IsDecimal,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Length
} from 'class-validator'
export class CreateSlotDto {
    @IsOptional()
    @IsString()
    @Length(0, 100)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    hour_price: number;

    @IsNotEmpty()
    @IsBoolean()
    is_covered: boolean;

    @IsNotEmpty()
    @IsNumber()
    vehicle_type_id: number;

    @IsNotEmpty()
    @IsString()
    property_id: string;

    @IsNotEmpty()
    @IsString()
    owner_id: string;

}
