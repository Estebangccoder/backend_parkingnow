import { Injectable } from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';

@Injectable()
export class SlotsService {
  create(createSlotDto: CreateSlotDto) {
    return 'This action adds a new slot';
  }

  findAll() {
    return `This action returns all slots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} slot`;
  }

  update(id: number, updateSlotDto: UpdateSlotDto) {
    return `This action updates a #${id} slot`;
  }

  remove(id: number) {
    return `This action removes a #${id} slot`;
  }
}
