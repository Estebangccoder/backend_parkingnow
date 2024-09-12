import { Slot } from 'src/slots/entities/slot.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';


@Entity('vehicle_types')
export class VehicleType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicleType)
  vehicles: Vehicle[];

  @OneToMany(() => Slot, (slot) => slot.vehicleType)
  slots: Slot[];

  @DeleteDateColumn({type: 'timestamp', nullable: true})
    delete_at: Date;
}
