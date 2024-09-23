import { ApiHideProperty } from '@nestjs/swagger';
import { Booking } from '../../bookings/entities/booking.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';


@Entity('booking_states')
export class BookingState {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50 })
  name: string;

  @DeleteDateColumn({type: 'timestamp', nullable: true})
  delete_at: Date;

  @ApiHideProperty()
  @OneToMany(() => Booking, (booking) => booking.bookingStateId, { onDelete: "CASCADE", cascade: true })
  bookings: Booking[];

}
