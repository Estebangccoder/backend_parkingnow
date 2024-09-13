import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsIn, IsOptional, IsString } from "class-validator";

export class FilterAvailablesDto {
    @IsOptional()
    @IsBoolean() 
    isCovered?: boolean;

    @IsOptional()
    @IsString()
    vehicleTypes?: string;

    @IsOptional()
    @IsString()
    comuna?: string;
}