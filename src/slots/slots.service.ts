import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateSlotDto } from "./dto/create-slot.dto";
import { UpdateSlotDto } from "./dto/update-slot.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Slot } from "./entities/slot.entity";
import { Repository } from "typeorm";
import { FilterAvailablesDto } from "./dto/filter-availables-slot.dto";

@Injectable()
export class SlotsService {
  constructor(
    @InjectRepository(Slot) private readonly slotRepository: Repository<Slot>,
  ) {}

  async create(slot: CreateSlotDto) {
    try {
      const createdSlot = this.slotRepository.create(slot);
      return await this.slotRepository.save(createdSlot);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create slot');
    }
  }

  async findAll() {
    try {
      const slots = await this.slotRepository.find();
      if (!slots.length) {
        throw new NotFoundException('No slots available');
      }
      return slots;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving slots');
    }
  }

  async findOne(id: string) {
    try {
      const slot = await this.slotRepository.findOne({
        where: { id },
        relations: ['owner'],
      });
      if (!slot) throw new NotFoundException('Slot not found');
      return slot;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving slot');
    }
  }

  async findAvailableSlotsByFilters(filters: FilterAvailablesDto) {
    const { isCovered, comuna, vehicleType } = filters;
    try {
      const query = this.slotRepository
        .createQueryBuilder('slot')
        .where('slot.is_available = :isAvailable', { isAvailable: true });

      if (comuna) {
        query
          .innerJoinAndSelect('slot.property', 'property')
          .andWhere('property.comuna_id = :comuna', { comuna });
      }

      if (vehicleType) {
        query.andWhere('slot.vehicle_type_id = :vehicleType', { vehicleType });
      }

      if (isCovered !== undefined) {
        query.andWhere('slot.is_covered = :isCovered', { isCovered });
      }

      const slots = await query.getMany();
      if (!slots.length) {
        throw new NotFoundException('No available slots matching the filters');
      }

      return slots;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching available slots');
    }
  }

  async update(id: string, updateSlotDto: UpdateSlotDto) {
    try {
      const slot = await this.findOne(id);
      Object.assign(slot, updateSlotDto);
      return await this.slotRepository.save(slot);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Slot not found for update');
      }
      throw new InternalServerErrorException('Failed to update slot');
    }
  }

  async remove(id: string) {
    try {
      const slot = await this.findOne(id);
      return await this.slotRepository.softRemove(slot);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Slot not found for deletion');
      }
      throw new InternalServerErrorException('Failed to delete slot');
    }
  }
}
