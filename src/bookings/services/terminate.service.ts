import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "../entities/booking.entity";
import { Repository } from "typeorm";
import { UpdateBookingDto } from "../dto";


@Injectable()
export class Terminate{
    constructor(
        @InjectRepository(Booking) private readonly bookingsRepository: Repository<Booking>
    ){}

    async terminate(booking: Booking, updateBookingData : UpdateBookingDto){
        // const {end_date, end_time, amount, rented_hours} = updateBookingData;

        // const newEndDate = new Date(end_date);
        // booking.end_date = newEndDate;
        // booking.end_time = end_time;
        // booking.amount = amount;
        // booking.rented_hours = rented_hours;
        // booking.booking_state_id = 2;
    
        // return await this.bookingsRepository.save(booking)
    }
}