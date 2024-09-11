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
    return this.slotRepositoy.create(slot);
  }

  findAll() {
    return this.slotRepositoy.find();
  }

  findOne(id: string) {
    return this.slotRepositoy.findOne({where: {id}});
  }

  update(id: string, updateSlotDto: UpdateSlotDto) {
    return this.slotRepositoy.update(id, updateSlotDto);
  }

  remove(id: string) {
    return this.slotRepositoy.delete(id);
  }
}
