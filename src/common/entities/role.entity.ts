import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';


@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 20 })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @DeleteDateColumn({type: 'timestamp', nullable: true})
  delete_at: Date;

}
