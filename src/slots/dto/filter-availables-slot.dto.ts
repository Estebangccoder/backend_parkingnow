import { IsBooleanString, IsOptional, IsString } from "class-validator";

export class FilterAvailablesDto {
    @IsOptional()
    @IsBooleanString() 
    isCovered?: boolean;

    @IsOptional()
    @IsString()
    vehicleType?: string;
  
    @IsOptional()
    @IsString()
    commune?: string;
}