import { Injectable } from "@nestjs/common";
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

        const newBooking = this.bookingsRepository.create(bookingData);
        return await this.bookingsRepository.save(newBooking);

    //     const {start_date} = bookingData;
    //     console.log(start_date);
        
    //     const newBooking = this.bookingsRepository.create(bookingData)
    //     console.log("newBooking",newBooking);

    //     newBooking.start_date = new Date(start_date);

    //     return await this.bookingsRepository.save(newBooking)
       

    }
    
}