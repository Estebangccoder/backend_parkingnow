import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
}from 'typeorm';


@Entity('vehicles')
export class Vehicle{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    driver_id: number;

    @Column('int')
    vehicle_type_id: number;

    @Column('varchar')
    plate: string;

    @CreateDateColumn({
        type: 'timestamp',
      })
      createdAt: Date;
    
    @UpdateDateColumn({
        type: 'timestamp',
      })
      updatedAt: Date;
    
}
