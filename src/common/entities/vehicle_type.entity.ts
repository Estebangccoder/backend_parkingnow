import { Slot } from 'src/slots/entities/slot.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class VehicleType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicleType)
  vehicles: Vehicle[];

  @OneToMany(() => Slot, (slot) => slot.vehicleType)
  slots: Slot[];
}
