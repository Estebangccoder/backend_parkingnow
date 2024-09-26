import { IsBooleanString, IsIn, IsOptional, IsString } from "class-validator";
import { UserPaginationDto } from "src/users/dto/users-pagination.dto";

export class FilterAvailablesDto extends UserPaginationDto {
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

}