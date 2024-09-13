import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//import { Vehicle } from "../entities/vehicle.entity";
import { DeleteVehicleDto } from '../dto/delete-vehicle.dto';


@Injectable()
export class FindVehicleById{
    // constructor(
    //     @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>
    // ){}

    // async findById(id: string){
    //     const vehicle = await this.vehicleRepository.findOne({where: {id}})
    //     return vehicle;
    // }
}