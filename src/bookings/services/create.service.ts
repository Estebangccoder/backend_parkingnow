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

    async create(bookingData: CreateBookingDto): Promise<Booking>{
        try {
            const newBooking: Booking = this.bookingsRepository.create(bookingData);
            return await this.bookingsRepository.save(newBooking);
        } catch (error) {
            throw new HttpException(
                error.message || "Error saving booking in DB ",
                error.status || 500
              );
        }
    }
}