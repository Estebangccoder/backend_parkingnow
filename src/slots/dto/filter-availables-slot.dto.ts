import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsBooleanString, IsIn, IsOptional, IsString } from "class-validator";

export class FilterAvailablesDto {
    @IsOptional()
    @IsBooleanString() 
    isCovered?: boolean;

    @IsOptional()
    @IsString()
    vehicleType?: string;
  
    @IsOptional()
    @IsString()
    comuna?: string;
}