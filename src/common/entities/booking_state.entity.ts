import { Booking } from 'src/bookings/entities/booking.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';


@Entity('booking_states')
export class BookingState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Booking, (booking) => booking.bookingStateId)
  bookings: Booking[];

  @DeleteDateColumn({type: 'timestamp', nullable: true})
  delete_at: Date;

}
