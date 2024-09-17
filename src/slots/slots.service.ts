import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { CreateSlotDto } from "./dto/create-slot.dto";
import { UpdateSlotDto } from "./dto/update-slot.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Slot } from "./entities/slot.entity";
import { QueryFailedError, Repository } from "typeorm";
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
      if (error instanceof QueryFailedError) {
        throw new BadRequestException()
      }
      throw new InternalServerErrorException(error.message || "Internal server error");
    }
  }

  async findAll() {
    try {
      return await this.slotRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message || "Internal server error");
    }
  }

  async findOne(id: string) {
    try {
      const slot = await this.slotRepository.findOne({
        where: { id }
      });

      if (!slot) throw new NotFoundException("Slot not found");

      return slot;
    } catch (error) {
      throw new InternalServerErrorException(error.message || "Internal server error");
    }
  }

  async findAllWithProperty() {

    try {
      return await this.slotRepository.find({ relations: ["property", "property.commune"] });
    } catch (error) {
      throw new InternalServerErrorException(error.message || "Internal server error");

    }
  }

  async findAvailableSlotsByFilters(filters: FilterAvailablesDto) {
    const { isCovered, commune, vehicleType } = filters;
    try {
      const query = this.slotRepository
        .createQueryBuilder("slot")
        .innerJoinAndSelect("slot.property", "property")
        .innerJoinAndSelect("property.commune", "commune")
        .where("slot.is_available = :isAvailable", { isAvailable: 1 });

      if (filters.commune) {
        query.andWhere("commune.id = :comunaId", { comunaId: filters.commune });
      }
  
      if (filters.vehicleType) {
        query.andWhere("slot.vehicle_type_id = :vehicleType", {
          vehicleType: filters.vehicleType,
        });
      }
  
      if (filters.isCovered) {
        query.andWhere("slot.is_covered = :isCovered", {
          isCovered: filters.isCovered,
        });
      }
  
      return await query.getMany();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException("Invalid query");
      }
      throw new InternalServerErrorException(error.message || "Internal server error");
    }
  }


  async update(id: string, updateSlotDto: UpdateSlotDto) {
    try {
      const slot = await this.findOne(id);

      if (!slot) throw new NotFoundException("Slot not found");

      const slotUpgraded = Object.assign(slot, updateSlotDto);
      return this.slotRepository.save(slotUpgraded);
    } catch (error) {
      throw new InternalServerErrorException(error.message || "Internal server error");
    }

  }

  async remove(id: string) {
    try {
      const slot = await this.findOne(id);
      if (!slot) throw new NotFoundException("Slot not found");


      return await this.slotRepository.softRemove(slot);

    } catch (error) {
      throw new InternalServerErrorException(error.message || "Internal server error");
    }
  }
}
