import { BookingState } from "src/common/entities/booking_state.entity";
import { Slot } from "src/slots/entities/slot.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'date'})
    star_date: Date;

    @Column({type: 'time'})
    start_time: string;

    @Column({type: 'integer'})
    rented_hours: number;

    @Column({type: 'date'})
    end_date: Date;

    @Column({type: 'time'})
    end_time: string;

    @Column({type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({type: 'varchar', length: 10, nullable: false})
    vehicle_plate: string;

    @Column('varchar', {nullable: false})
    owner_id: string;
    
    @Column('varchar', {nullable: false})
    driver_id: string;
      
    @Column('varchar', {nullable: false})
    slot_id: string;

    @Column({type: 'int', nullable: false})
    booking_state_id: number;

    @CreateDateColumn({type: 'timestamp'})
    creartedAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

    @DeleteDateColumn({type: 'timestamp', nullable: true})
    delete_at: Date;

    @ManyToOne(() => User, (user) => user.bookingsDriver)
    @JoinColumn({name: 'driver_id'})
    driverId: User;

    @ManyToOne(() => User, (user) => user.bookingsOwner)
    @JoinColumn({name: 'owner_id'})
    ownerId: User;
    
    @ManyToOne(() => Slot, (slot) => slot.bookings)
    @JoinColumn({name:'slot_id'})
    slotId: Slot;

    @ManyToOne(() => BookingState, (bookingState) => bookingState.bookings)
    @JoinColumn({name: 'booking_state_id'})
    bookingStateId: BookingState;

}
