import { ApiHideProperty } from "@nestjs/swagger";
import { Booking } from "src/bookings/entities/booking.entity";
import { VehicleType } from "src/common/entities/vehicle_type.entity";
import { Property } from "src/properties/entities/property.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("slots")
export class Slot {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "boolean", default: true })
  is_available: boolean;

  @Column({ type: "decimal" })
  hour_price: number;

  @Column({ type: "boolean" })
  is_covered: boolean;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column({ type: 'int', nullable: false })
  vehicle_type_id: number;

  @Column({ type: 'varchar', nullable: false })
  owner_id: string;

  @Column({ type: 'varchar', nullable: false })
  property_id: string;

  @CreateDateColumn({ type: "timestamp" })
  crearted_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  delete_at: Date;

  @OneToMany(() => Booking, (booking) => booking.slotId)
  bookings: Booking[];

  @ApiHideProperty()
  @ManyToOne(() => VehicleType, (vehicleType) => vehicleType.slots)
  @JoinColumn({ name: "vehicle_type_id" })
  vehicleType: VehicleType;

  @ManyToOne(() => Property, (property) => property.slots)
  @JoinColumn({ name: "property_id" })
  propertyId: Property;

  @ManyToOne(() => User, (user) => user.slots)
  @JoinColumn({ name: "owner_id" })
  owner: User;

}
