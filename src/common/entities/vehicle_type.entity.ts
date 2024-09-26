import { ApiHideProperty } from '@nestjs/swagger';
import { Slot } from '../../slots/entities/slot.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';


@Entity('vehicle_types')
export class VehicleType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50 })
  name: string;

  @DeleteDateColumn({type: 'timestamp', nullable: true})
  delete_at: Date;

  @ApiHideProperty()
  @OneToMany(() => Slot, (slot) => slot.vehicleType, { onDelete: "CASCADE", cascade: true })
  slots: Slot[];

}
