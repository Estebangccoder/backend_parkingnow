import { VehicleType } from 'src/common/entities/vehicle_type.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';


@Entity('vehicles')
export class Vehicle {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  plate: string;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;

  @ManyToOne(() => User, user => user.vehicles)
  @JoinColumn({ name: 'driver_id' })
  driverId: User;

  @ManyToOne(() => VehicleType, (vehicleType) => vehicleType.vehicles)
  @JoinColumn({ name: 'vehicle_type_id' })
  vehicleType: VehicleType;

  @Column('int', {nullable: false})
  vehicle_type_id: number;

  @Column('varchar', {nullable: false})
  driver_id: string;

}
