import { Injectable, HttpException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Booking } from "../entities/booking.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FindBookingInProgress{
    constructor(
        @InjectRepository(Booking) private readonly bookingsRepository: Repository<Booking> 
    ){}

    async find(driverId: string){
        try {
            return await this.bookingsRepository.findOne({
                where: {
                    driver_id: driverId,
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
