import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateSlotDto {
  @ApiProperty({ description: 'Slot name', example: 'Estacionamiento A1' })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  name: string;

  @ApiProperty({ description: 'Price per hour', example: 5000.00 })
  @IsNotEmpty()
  @IsNumber()
  hour_price: number;

  @ApiProperty({ description: 'Indicates if the slot is covered', example: true })
  @IsNotEmpty()
  @IsBoolean()
  is_covered: boolean;

  @ApiProperty({ description: 'Allowed Vehicle Type ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  vehicle_type_id: number;

  @ApiProperty({ description: 'ID of the property where the slot is located', example: '72a54315-27ee-49aa-be8f-aea94b83b5a1' })
  @IsNotEmpty()
  @IsUUID()
  property_id: string;

  @ApiHideProperty()
  @IsOptional()
  @IsUUID()
  owner_id: string;
}
