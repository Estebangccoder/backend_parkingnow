import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    fullName: string;

    @Column( {unique: true , nullable: false} )
    email: string;

    @Column( {nullable: false} )
    password: string;

    @Column()
    phone: number;

    @Column()
    address: string;

    @Column()
    rol: string; //posible enum con los roles admin, user

    @Column()
    id_typedoc: string;

    @Column()
    num_doc: number;

    @DeleteDateColumn()
    deletedAt: Date;
 }
