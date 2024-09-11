import { Property } from 'src/properties/entities/property.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';


@Entity('communes')
export class Commune {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Property, (property) => property.commune)
  properties: Property[];

  @DeleteDateColumn({type: 'timestamp', nullable: true})
  delete_at: Date;
}
