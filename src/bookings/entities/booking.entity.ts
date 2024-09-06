import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({type: 'decimal'})
    amount: number;

    @Column({type: 'date'})
    end_date: Date;

    @Column({type: 'time'})
    end_time: string;

    @CreateDateColumn({type: 'timestamp'})
    creartedAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;
}
