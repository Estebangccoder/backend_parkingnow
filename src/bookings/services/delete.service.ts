import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "../entities/booking.entity";
import { Repository } from "typeorm";


@Injectable()
export class Delete{
    constructor(
        @InjectRepository(Booking) private readonly bookingsRepository: Repository<Booking>
    ){}

    async delete(id : string) {
        try {
            return await this.bookingsRepository.softDelete(id);
        } catch (error) {
            throw new HttpException(
                error.message || "Error removing booking in DB ",
                error.status || 500
              );
        }
    }
}