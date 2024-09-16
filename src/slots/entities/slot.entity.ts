import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Booking } from "src/bookings/entities/booking.entity";
import { VehicleType } from "src/common/entities/vehicle_type.entity";
import { Property } from "src/properties/entities/property.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("slots")
export class Slot {
  
  @ApiProperty({
    description: 'ID of the slot',
    example: 'f5a88e1a-5b8f-4c92-85ff-3c4c0f7af3b9',
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    description: 'Name of the slot',
    example: 'Parking Slot A1',
  })
  @Column({ type: "varchar", length: 100 })
  name: string;

  @ApiProperty({
    description: 'Indicates if the slot is currently available',
    example: true,
  })
  @Column({ type: "boolean", default: true })
  is_available: boolean;

  @ApiProperty({
    description: 'Hourly price of the slot',
    example: 5000.00,
  })
  @Column({
    type: 'decimal', precision: 10, scale: 2, transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value) 
    }})
  hour_price: number;

  @ApiProperty({
    description: 'Indicates if the slot is covered or uncovered',
    example: true,
  })
  @Column({ type: "boolean" })
  is_covered: boolean;

  @ApiProperty({
    description: 'ID of the vehicle type that can use this slot',
    example: 1,
  })

  @Column({ type: 'int', nullable: false })
  vehicle_type_id: number;

  @ApiProperty({
    description: 'ID of the owner of the slot',
    example: '3f33ba0b-c4fe-4640-b655-7c5a99cbec10',
  })
  @Column({ type: 'varchar', nullable: false })
  owner_id: string;

  @ApiProperty({
    description: 'ID of the property to which the slot belongs',
    example: 'd8ad82a2-0e4f-4b83-89f9-514d9bca8bfa',
  })
  @Column({ type: 'varchar', nullable: false })
  property_id: string;

  @ApiProperty({
    description: 'Date when the slot was created',
    example: '2024-09-15T10:30:00Z',
  })
  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @ApiProperty({
    description: 'Date when the slot was last update',
    example: '2024-09-16T14:22:00Z',
  })
  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @ApiProperty({
    description: 'Date when the slot was deleted',
    example: '2024-09-16T14:22:00Z',
  })
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  delete_at: Date;

  @ApiHideProperty()
  @OneToMany(() => Booking, (booking) => booking.slotId)
  bookings: Booking[];

  @ApiHideProperty()
  @ManyToOne(() => VehicleType, (vehicleType) => vehicleType.slots)
  @JoinColumn({ name: "vehicle_type_id" })
  vehicleType: VehicleType;

  @ApiHideProperty()
  @ManyToOne(() => Property, (property) => property.slots)
  @JoinColumn({ name: "property_id" })
  property: Property;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.slots)
  @JoinColumn({ name: "owner_id" })
  owner: User;
}
