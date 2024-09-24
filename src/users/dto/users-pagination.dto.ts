import { IsOptional, IsString } from "class-validator";

export class UserPaginationDto {
    @IsOptional()
    @IsString()
    skip?: string;

    @IsOptional()
    @IsString()
    take?: string;
}