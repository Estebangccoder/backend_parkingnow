import { Booking } from "src/bookings/entities/booking.entity";
import { VehicleType } from "src/common/entities/vehicle_type.entity";
import { Property } from "src/properties/entities/property.entity";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("slots")
export class Slot {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column({ type: "boolean", default: true })
  is_available: boolean;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  hour_price: number;

  @Column({ type: "boolean" })
  is_covered: boolean;

  @CreateDateColumn({
    type: "timestamp"
  })
  crearted_at: Date;

  @UpdateDateColumn({
    type: "timestamp"
  })
  updated_at: Date;

  @OneToMany(() => Booking, (booking) => booking.slotId)
  bookings: Booking[];

  @ManyToOne(() => VehicleType, (vehicleType) => vehicleType.slots)
  @JoinColumn({ name: "vehicle_type_id" })
  vehicleType: VehicleType;
  
  @Column()
  vehicle_type_id: number;

  @ManyToOne(() => Property, (property) => property.slots)
  @JoinColumn({ name: "property_id" })
  propertyId: Property;

  @Column()
  property_id: string;

  @ManyToOne(() => User, (user) => user.slots)
  @JoinColumn({ name: "owner_id" })
  ownerId: User;

  @Column()
  owner_id: string;
}
