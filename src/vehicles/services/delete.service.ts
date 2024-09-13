import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//import { Vehicle } from "../entities/vehicle.entity";
import { Repository } from "typeorm";
import { DeleteVehicleDto } from '../dto/delete-vehicle.dto';
import { FindVehicleById } from '../services';

@Injectable()
export class Delete{
    // constructor(
    //     @InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
    // ){}

    // async delete(id: string): Promise<any>{
    //     const vehicleDeleted = await this.vehicleRepository.delete(id);
    //     return vehicleDeleted;
    // }
}