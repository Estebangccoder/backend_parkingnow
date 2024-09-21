import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "../entities/booking.entity";
import { Repository } from "typeorm";


@Injectable()
export class FindInProgressByOwnerId{
    constructor(
        @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>
    ){}

    async find(ownerId: string): Promise<Booking[]> {
        try {
            return await this.bookingRepository.find({
                where: {
                    owner_id: ownerId,
                    booking_state_id: 1
                  }
            })
        } catch (error) {
            throw new HttpException(
                error.message || "Internal server error ",
                error.status || 500
              );
        }
    }
}