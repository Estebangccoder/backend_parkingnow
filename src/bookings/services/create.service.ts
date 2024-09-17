import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "../entities/booking.entity";
import { Repository } from "typeorm";
import { CreateBookingDto } from "../dto";


@Injectable()
export class Create{
    constructor(
        @InjectRepository(Booking) private readonly bookingsRepository: Repository<Booking>
    ){}

    async create(bookingData: CreateBookingDto){
        try {
            const newBooking = this.bookingsRepository.create(bookingData);
            return await this.bookingsRepository.save(newBooking);
        } catch (error) {
            throw new HttpException(
                error.message || "Internal server error",
                error.status || 500
              );
        }
    }
}