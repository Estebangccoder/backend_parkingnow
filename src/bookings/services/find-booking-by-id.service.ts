import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "../entities/booking.entity";
import { Repository } from "typeorm";


@Injectable()
export class FindById{
    constructor(
        @InjectRepository(Booking) private readonly bookingsRepository: Repository<Booking>
    ){}

    async findBooking(id : string) {
        return this.bookingsRepository.findOne({where: {id}})
    }
}