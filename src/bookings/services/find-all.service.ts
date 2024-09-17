import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Booking } from "../entities/booking.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FindAll{
    constructor(
        @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>
    ){}

    async findAll(){
        return await this.bookingRepository.find();
    }
}