
import { Booking } from "src/bookings/entities/booking.entity";
import { DocumentType } from "src/common/entities/document_type.entity";
import { Role } from "src/common/entities/role.entity";
import { Property } from "src/properties/entities/property.entity";
import { Slot } from "src/slots/entities/slot.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({type: 'varchar', length: 255})
    fullname: string;

    @Column({ unique: true , nullable: false, type: 'varchar', length:100})
    email: string;

    @Column( {nullable: false} )
    password: string;

    @Column({type: 'varchar', length: 30})
    phone_number: number;

    @Column({type: 'varchar', length: 255})
    address: string;
    
    @Column({type: 'varchar', length: 30})
    doc_number: number;

    @Column({ default: false })
    isActive: boolean;
    
    @Column({nullable: false, default: 1})
    role_id: number;

    @Column({nullable: false})
    document_type_id: number;

    @CreateDateColumn({type: 'timestamp'})
    crearted_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;
    
    @DeleteDateColumn({type: 'timestamp', nullable: true})
    delete_at: Date;

    @OneToMany(() => Property, (property) => property.ownerId)
    properties: Property[];
    
    @OneToMany(() => Slot, (slot) => slot.owner)
    slots: Slot[];
    
    @OneToMany(() => Booking, (booking) => booking.ownerId)
    bookingsOwner: Booking[];
    
    @OneToMany(() => Booking, (booking) => booking.driverId)
    bookingsDriver: Booking[];

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({name: 'role_id'})
    role: Role;

    @ManyToOne(() => DocumentType, (documentType) => documentType.users)
    @JoinColumn({name: 'document_type_id'})
    documentType: DocumentType;
    
}
