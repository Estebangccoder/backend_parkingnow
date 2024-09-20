import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "../entities/booking.entity";
import { Repository } from "typeorm";

@Injectable()
export class VerifyPlateWithoutBooking{
    constructor(
        @InjectRepository(Booking) private readonly bookingsRepository: Repository<Booking>
    ){} 

    async veryfy(vehiclePlate: string): Promise<Booking>{
        try {
            const booking = this.bookingsRepository.findOne({
                where:{
                    vehicle_plate: vehiclePlate,
                    booking_state_id: 1
                }
            })
            return booking;
            // if (booking !== null) {
            //     return booking;
            //   }else{
            //     return 0;
            //   }
        } catch (error) {
            throw new HttpException(
                error.message || "Internal server error",
                error.status || 500
              );
        }
    }
}


