import { Slot } from "src/slots/entities/slot.entity";
import { User } from "src/users/entities/user.entity";
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    address: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    comuna: string;

    @Column({type: 'varchar', length: 50})
    image_url: string;

    @CreateDateColumn({type: 'timestamp'})
    crearted_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @OneToMany(() => Slot, (slot) => slot.propertyId)
    slots: Slot[];

    @ManyToOne(() => User, (user) => user.properties)
    @JoinColumn({name: 'owner_id'})
    ownerId: User;

}