import { IsArray, IsNumber, isString, IsString, MinLength } from "class-validator";

export class CreatePropertyDto {
    
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsString()
    description: string;

    @IsString()
    image_url: string;

    @IsNumber()
    commune_id: number;

    @IsString()
    owner_id: string;

}

