import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { CreateSlotDto } from "./dto/create-slot.dto";
import { UpdateSlotDto } from "./dto/update-slot.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Slot } from "./entities/slot.entity";
import { QueryFailedError, Repository } from "typeorm";
import { FilterAvailablesDto } from "./dto/filter-availables-slot.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class SlotsService {
  constructor(
    @InjectRepository(Slot) private readonly slotRepository: Repository<Slot>,
    private readonly userService: UsersService,
  ) { }

  async createMany(slots: CreateSlotDto[], email: string): Promise<Slot[]>  {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (!user) throw new UnauthorizedException()

      slots.forEach((slot) => {
      slot.owner_id = user.id
      })
      
      const createdSlots: Slot[] = this.slotRepository.create(slots);
      return await this.slotRepository.save(createdSlots);

    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException()
      }
      throw new InternalServerErrorException(error.message || "Internal server error");
    }
  }

  async create(slot: CreateSlotDto, email: string): Promise<Slot>  {
    try {
      const user = await this.userService.findOneByEmail(email);

      if (!user) throw new UnauthorizedException()

      slot.owner_id = user.id
      const createdSlot: Slot = this.slotRepository.create(slot);
      return await this.slotRepository.save(createdSlot);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException()
      }
      throw new InternalServerErrorException(error.message || "Internal server error");
    }
  }

  async findAll(): Promise<Slot[]>  {
    try {
      return await this.slotRepository.find();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException()
      }
      throw new InternalServerErrorException(error.message || "Internal server error");
    }
  }

  async findOne(id: string) {
    try {
      const slot: Slot = await this.slotRepository.findOne({
        where: {id} , relations: ["property", "vehicleType", "property.commune"] 
      });

      if (!slot) throw new NotFoundException("Slot not found");

      return slot;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException()
      }
      throw new InternalServerErrorException(error.message || "Internal server error");
    }
  }

  async findAllWithProperty() {

    try {
      return await this.slotRepository.find({ relations: ["property", "property.commune"] });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException()
      }
      throw new InternalServerErrorException(error.message || "Internal server error");

    }
  }

  async findAvailableSlotsByFilters(filters: FilterAvailablesDto): Promise<Slot[]>  {

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

      if (filters.order) {
        filters.order === "ASC"? query.orderBy("slot.hour_price", "ASC"): query.orderBy("slot.hour_price", "DESC")
      }
      
      if (filters.skip){
        query.skip(parseInt(filters.skip))
      }

      query.take()
      
      return await query.getMany();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException("Invalid query");
      }
      throw new InternalServerErrorException(error.message || "Internal server error");
    }
  }


  async update(id: string, updateSlotDto: UpdateSlotDto, tokenId: string): Promise<Slot>  {
    try {
      const slot = await this.findOne(id);
      if (!slot) throw new NotFoundException("Slot not found");

      const response = await this.userService.ownerIdValidation(slot.owner_id, tokenId)
      if (!response) throw new UnauthorizedException("You are not allowed to update this slot")

      const slotUpgraded = Object.assign(slot, updateSlotDto);
      return await this.slotRepository.save(slotUpgraded);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException()
      }
      throw new InternalServerErrorException(error.message || "Internal server error");
    }

  }

  async updateSlotAvailability(slotId: string, newState: boolean): Promise<Boolean> {
    const slot = await this.findOne(slotId);
    if (!slot) throw new NotFoundException('Slot not found');
    
    slot.is_available = newState;
    const slotModified = await this.slotRepository.save(slot);
    if (!slotModified) throw new BadRequestException(`Could not update slot ${slotId}`);

    return true;
  }

  async remove(id: string, userEmail: string): Promise<Slot> {
    try {
      const user = await this.userService.findOneByEmail(userEmail);
      if (!user) throw new UnauthorizedException("You are not allowed to update this slot")

      const slot = await this.findOne(id);
      if (!slot) throw new NotFoundException("Slot not found");

      if (slot.owner_id !== user.id) throw new UnauthorizedException("You are not allowed to update this slot")

      return await this.slotRepository.softRemove(slot);

    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException()
      }
      throw new InternalServerErrorException(error.message || "Internal server error");
    }
  }

  // async  findUserSlot(userId: number) {
  //   const slot: Slot = await this.slotRepository
  //     .createQueryBuilder('slot')
  //     .innerJoinAndSelect('slot.bookings', 'booking')
  //     .where('booking.owner_id = :userId OR booking.driver_id = :userId', { userId })
  //     .andWhere('booking.booking_state_id = :status', { status: 1 })
  //     .getOne();
  
  //   return slot;
  // }
}
