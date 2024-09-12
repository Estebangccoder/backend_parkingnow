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

    @IsOptional()
    @IsString()
    @Length(0, 255)
    description: string;

    @IsNotEmpty()
    @IsNumber()
    hour_price: number;

    @IsNotEmpty()
    @IsBooleanString()
    is_covered: boolean;

    @IsNotEmpty()
    @IsString()
    vehicle_type_id: number;

    @IsNotEmpty()
    @IsUUID()
    property_id: string;

    @IsNotEmpty()
    @IsUUID()
    owner_id: string;

}
