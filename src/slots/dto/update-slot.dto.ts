import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSlotDto } from './create-slot.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSlotDto extends PartialType(CreateSlotDto) {
    @ApiProperty({ description: 'Indicates if the slot is available', example: false })
    @IsOptional()
    @IsBoolean()
    is_available: boolean;
}
