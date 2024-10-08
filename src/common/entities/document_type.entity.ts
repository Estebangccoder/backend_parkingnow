import { ApiHideProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';


@Entity('document_types')
export class DocumentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50 })
  name: string;

  @ApiHideProperty()
  @OneToMany(() => User, (user) => user.documentType, { onDelete: "CASCADE", cascade: true })
  users: User[];

  @DeleteDateColumn({type: 'timestamp', nullable: true})
  delete_at: Date;
  
}
