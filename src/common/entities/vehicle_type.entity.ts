import { ApiHideProperty } from '@nestjs/swagger';
import { Slot } from 'src/slots/entities/slot.entity';
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
  @OneToMany(() => Slot, (slot) => slot.vehicleType)
  slots: Slot[];

}
