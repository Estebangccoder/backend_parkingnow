import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsIn, IsOptional, IsString } from "class-validator";

export class FilterAvailablesDto {
    @IsOptional()
    @IsArray()
    @IsBoolean({ each: true }) 
    isCovered?: boolean[];

    @ApiProperty({ type: [String], required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @IsIn(['1', '2'] ,{ each: true })
    vehicleTypes?: string[];

    @IsOptional()
    @IsString()
    comuna?: string;
}