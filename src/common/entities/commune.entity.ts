import { Property } from 'src/properties/entities/property.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Commune {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Property, (property) => property.commune)
  properties: Property[];
}
