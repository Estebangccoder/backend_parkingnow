import { IsBooleanString, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

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

    @IsOptional()
    @IsString()
    @IsIn(['ASC','DESC'])
    order?: string;

    @IsOptional()
    @IsString()
    skip?: string;

    @IsNotEmpty()
    @IsString()
    take: string;

}