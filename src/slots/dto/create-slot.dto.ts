import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({ description: 'ID of the property where the slot is located', example: 'd8ad82a2-0e4f-4b83-89f9-514d9bca8bfa' })
  @IsNotEmpty()
  @IsUUID()
  property_id: string;

  @ApiProperty({ description: 'Slot owner ID', example: '3f33ba0b-c4fe-4640-b655-7c5a99cbec10' })
  @IsNotEmpty()
  @IsUUID()
  owner_id: string;
}
