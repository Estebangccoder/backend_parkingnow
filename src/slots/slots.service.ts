import { Injectable } from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Slot } from './entities/slot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SlotsService {
  constructor(@InjectRepository(Slot) private readonly slotRepositoy: Repository<Slot>){}

  async create(slot: CreateSlotDto) {
    return await this.slotRepositoy.create(slot);
  }

  findAll() {
    return `This action returns all slots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} slot`;
  }

  update(id: string, updateSlotDto: UpdateSlotDto) {
    return `This action updates a #${id} slot`;
  }

  remove(id: number) {
    return `This action removes a #${id} slot`;
  }
}
