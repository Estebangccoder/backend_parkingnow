import { PartialType } from '@nestjs/swagger';
import { CreateSlotDto } from './create-slot.dto';

export class UpdateSlotDto extends PartialType(CreateSlotDto) {}
