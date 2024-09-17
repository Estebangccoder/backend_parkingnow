import { Injectable, HttpException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "../entities/booking.entity";
import { Repository } from "typeorm";


@Injectable()
export class FindById{
    constructor(
        @InjectRepository(Booking) private readonly bookingsRepository: Repository<Booking>
    ){}

    async findBooking(id : string) {
        try {
            const booking: Booking = await this.bookingsRepository.findOne({where: {id}});
            if (!booking) throw new NotFoundException("Booking not found");
            return booking;
        } catch (error) {
            throw new HttpException(
                error.message || "Internal server error",
                error.status || 500
              );
        }
    }
}