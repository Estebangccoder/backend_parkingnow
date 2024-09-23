import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { BookingState } from "../../common/entities/booking_state.entity";
import { Slot } from "../../slots/entities/slot.entity";
import { User } from "../../users/entities/user.entity";
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
        example: 'bb926c5a-dc35-4c3e-95fa-f25540a51b7f',
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
        example: '75127070-8380-4721-b2f5-677162a38a43',
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
        example: '911c8821-f2d4-4648-9c01-79472d8f0a6e',
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
    slot: Slot;

    @ApiHideProperty()
    @ManyToOne(() => BookingState, (bookingState) => bookingState.bookings)
    @JoinColumn({name: 'booking_state_id'})
    bookingStateId: BookingState;

}
