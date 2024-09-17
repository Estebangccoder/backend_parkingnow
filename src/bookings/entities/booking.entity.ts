import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { BookingState } from "src/common/entities/booking_state.entity";
import { Slot } from "src/slots/entities/slot.entity";
import { User } from "src/users/entities/user.entity";
import { Column, 
        CreateDateColumn, 
        DeleteDateColumn, 
        Entity, JoinColumn, 
        ManyToOne, 
        PrimaryGeneratedColumn,
        UpdateDateColumn } from "typeorm";


@Entity('bookings')
export class Booking {

    @ApiProperty({
        description: 'ID of the bookings',
        example: 'f5a88e1a-5b8f-4c92-85ff-3c4c0f7af3b9',
      })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Start date of the booking',
        example: '2024-09-15T10:30:00Z',
      })
    @Column({type: 'timestamp'})
    start_date_time: Date;

    @ApiProperty({
        description: 'Total rented hours for the booking',
        example: '5',
      })
    @Column({ type: 'decimal', default: 1, precision: 10, scale: 2,  transformer: { 
        to: (value: number) => value, 
        from: (value: string) => parseFloat(value) 
    }})
    rented_hours: number;

    @ApiProperty({
        description: 'End date of the booking',
        example: '2024-09-15T10:30:00Z',
      })
    @Column({type: 'timestamp', nullable: true})
    end_date_time: Date;

    @ApiProperty({
        description: 'Total Cost',
        example: '10000.5',
      })
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: { 
        to: (value: number) => value, 
        from: (value: string) => parseFloat(value) 
    }})
    amount: number;

    @ApiProperty({
        description: 'vehicle plate',
        example: 'JWT666',
      })
    @Column({type: 'varchar', length: 10})
    vehicle_plate: string;

    @ApiProperty({
        description: "ID of the slot's owner",
        example: '3f33ba0b-c4fe-4640-b655-7c5a99cbec10',
      })
    @Column('varchar')
    owner_id: string;
    
    @ApiProperty({
        description: "ID of the vehicle's driver",
        example: '0a34aa48-7e96-4601-8357-f7418127d54c',
      })
    @Column('varchar')
    driver_id: string;
    
    @ApiProperty({
        description: "ID of the slot rented",
        example: 'b11b9cd7-c707-4ef8-b0c5-9f74f3f8a9c5',
      })
    @Column('varchar')
    slot_id: string;
    
    @ApiProperty({
        description: "ID of the booking state",
        example: '1',
      })
    @Column({type: 'int', default: 1})
    booking_state_id: number;

    @ApiProperty({
        description: 'Date when the booking was created',
        example: '2024-09-15T10:30:00Z',
      })
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @ApiProperty({
        description: 'Date when the booking was updated',
        example: '2024-09-15T10:30:00Z',
      })
    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

    @ApiProperty({
        description: 'Date when the booking was deleted',
        example: '2024-09-15T10:30:00Z',
      })
    @DeleteDateColumn({type: 'timestamp', nullable: true})
    deleted_at: Date;

    @ApiHideProperty()
    @ManyToOne(() => User, (user) => user.bookingsDriver)
    @JoinColumn({name: 'driver_id'})
    driverId: User;

    @ApiHideProperty()
    @ManyToOne(() => User, (user) => user.bookingsOwner)
    @JoinColumn({name: 'owner_id'})
    ownerId: User;
    
    @ApiHideProperty()
    @ManyToOne(() => Slot, (slot) => slot.bookings)
    @JoinColumn({name:'slot_id'})
    slotId: Slot;

    @ApiHideProperty()
    @ManyToOne(() => BookingState, (bookingState) => bookingState.bookings)
    @JoinColumn({name: 'booking_state_id'})
    bookingStateId: BookingState;

}
