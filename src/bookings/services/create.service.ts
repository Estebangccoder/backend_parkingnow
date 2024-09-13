import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "../entities/booking.entity";
import { Repository } from "typeorm";
import { CreateBookingDto } from "../dto/create-booking.dto";


@Injectable()
export class Create{
    constructor(
        @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>
    ){}

    async create(createBookinData: CreateBookingDto): Promise<any>{
        const newBooking =  /*await*/ this.bookingRepository.create(createBookinData)
        return await this.bookingRepository.save(createBookinData)
    }
}