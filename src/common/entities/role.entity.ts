import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 20 })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
