import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//import { Vehicle } from "../entities/vehicle.entity";
import { Repository } from "typeorm";
//import { CreateVehicleDto } from "../dto/create-vehicle.dto";


@Injectable()
export class Create{
    // constructor(
    //     @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>
    // ){};

    // create(vehicleData: CreateVehicleDto): Promise<Vehicle>{

    //     const newVehicle = this.vehicleRepository.create(vehicleData);
    //     return this.vehicleRepository.save(vehicleData);
    // }
}