import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "../entities/booking.entity";
import { Repository } from "typeorm";


@Injectable()
export class Delete{
    constructor(
        @InjectRepository(Booking) private readonly bookingsRepository: Repository<Booking>
    ){}

    async delete(id : string){
        return await this.bookingsRepository.softDelete(id);
    }
}