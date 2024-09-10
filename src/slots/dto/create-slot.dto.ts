import {
    IsBoolean,
    IsBooleanString,
    IsDecimal,
    IsNotEmpty,
    IsNumberString,
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
    @IsDecimal()
    hourPrice: number;

    @IsNotEmpty()
    @IsBooleanString()
    isAvailable: boolean;

    @IsNotEmpty()
    @IsBooleanString()
    isCovered: boolean;

    @IsNotEmpty()
    @IsString()
    vehicle_type_id: number;

    @IsNotEmpty()
    @IsString()
    property_id: string;

    @IsNotEmpty()
    @IsString()
    owner_id: string;

}
