import { IsString, IsNumber, IsOptional, IsUUID } from "class-validator";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export class CreatePropertyDto {
    @ApiProperty({
        description: 'Name of the property',
        example: 'Rwi',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Address of the property',
        example: 'Riwi',
    })
    @IsString()
    address: string;

    @ApiProperty({
        description: 'Description of the property',
        example: 'Parqueadero de riwi',
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Image URL of the property',
        example: 'https://example.com/images/property.jpg',
    })
    @IsString()
    image_url: string;

    @ApiProperty({
        description: 'ID of the commune where the property is located',
        example: 1,
    })
    @IsNumber()
    commune_id: number;

    @ApiProperty({
        description: 'ID of the user who owns the property',
        example: '324f0caf-2501-4fe0-a7be-216afb0c5dff',
    })
    @ApiHideProperty()
    @IsOptional()
    @IsUUID()
    owner_id: string;
}
