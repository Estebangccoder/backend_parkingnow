import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "../entities/booking.entity";
import { Repository, UpdateResult } from "typeorm";
import { TerminateBookingDto } from "../dto";


@Injectable()
export class Terminate{
    constructor(
        @InjectRepository(Booking) private readonly bookingsRepository: Repository<Booking>
    ){}

    async terminate(bookingId: string, data : TerminateBookingDto): Promise<UpdateResult>{
        try {
            return await this.bookingsRepository.update(bookingId, data);
        } catch (error) {
            throw new HttpException(
                error.message || "Internal server error",
                error.status || 500
              );
        }
    }
}