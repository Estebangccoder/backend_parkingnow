import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('slots')
export class Slot {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'varchar', length: 255})
    description: string;

    @Column({type: 'boolean'})
    is_available: boolean;

    @Column({type: 'decimal'})
    hour_price: number;

    @Column({type: 'boolean'})
    is_covered: boolean;

    @CreateDateColumn({type: 'timestamp'})
    crearted_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

}
