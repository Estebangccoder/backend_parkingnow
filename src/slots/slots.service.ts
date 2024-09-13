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
    @InjectRepository(Slot) private readonly slotRepository: Repository<Slot>
  ) { }

  async create(slot: CreateSlotDto) {
    try {
      const createdSlot = this.slotRepository.create(slot);

      return await this.slotRepository.save(createdSlot);
    } catch (error) {
      throw new HttpException(
        error.message || "Internal server error",
        error.status || 500
      );
    }
  }

  async findAll() {
    try {
      return await this.slotRepository.find();
    } catch (error) {
      throw new HttpException(
        error.message || "Internal server error",
        error.status || 500
      );
    }
  }

  async findOne(id: string) {
    try {
      const slot = await this.slotRepository.findOne({
        where: { id },
        relations: ["owner"],
      });

      if (!slot) throw new NotFoundException("Slot not found");

      return slot;
    } catch (error) {
      throw new HttpException(
        error.message || "Internal server error",
        error.status || 500
      );
    }
  }

  async findAvailableSlotsByFilters(filters: FilterAvailablesDto) {

    const { isCovered, comuna, vehicleType } = filters
    try {
      const query = this.slotRepository
        .createQueryBuilder("slot")
        .where("slot.is_available = :isAvailable", { isAvailable: 1 });

      if (filters.comuna) {
        query
          .innerJoinAndSelect("slot.property", "property")
          .andWhere("property.comuna_id = :comuna", { comuna: filters.comuna });
      }

      if (filters.vehicleType) {
        query.andWhere("slot.vehicle_type_id = :vehicleTypes", {
          vehicleTypes: filters.vehicleType,
        });
      }

      if (filters.isCovered) {
          query.andWhere("slot.is_covered = :isCovered", {
            isCovered: filters.isCovered,
        });
      }

      return await query.getMany();
    } catch (error) {
      throw new HttpException(
        error.message || "Internal server error",
        error.status || 500
      );
    }
  }


  async update(id: string, updateSlotDto: UpdateSlotDto) {
    try {
      const slot = this.findOne(id);

      if (!slot) throw new NotFoundException("slot not fount");

      return this.slotRepository.save(updateSlotDto);
    } catch (error) { }
  }

  async remove(id: string) {
    try {
      const slot = await this.findOne(id);

      if (!slot) throw new NotFoundException("Slot not found");

      return await this.slotRepository.remove(slot);

      return slot;
    } catch (error) {
      throw new HttpException(
        error.message || "Internal server error",
        error.status || 500
      );
    }
  }
}
