import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//import { Vehicle } from "../entities/vehicle.entity";

@Injectable()
export class FindAllVehicles{
    // constructor(
    //     @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>
    // ){}

    // async findAll(user_id: string){
    //     return await this.vehicleRepository.find({ where: { driver_id: user_id } });
    // }
}