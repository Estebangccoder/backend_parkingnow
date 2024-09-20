import { Booking } from "../../bookings/entities/booking.entity";
import { DocumentType } from "../../common/entities/document_type.entity";
import { Role } from "../../common/entities/role.entity";
import { Property } from "../../properties/entities/property.entity";
import { Slot } from "../../slots/entities/slot.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        description: 'ID of the user',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string;
    
    @Column({ type: 'varchar', length: 255 })
    @ApiProperty({
        description: 'Full name of the user',
        example: 'Prueba example',
    })
    fullname: string;

    @Column({ unique: true, nullable: false, type: 'varchar', length: 100 })
    @ApiProperty({
        description: 'Email address of the user',
        example: 'prueba@example.com',
    })
    email: string;

    @Column({ nullable: false })
    @ApiProperty({
        description: 'Password of the user',
        example: 'clave123',
    })
    password: string;

    @Column({ type: 'varchar', length: 30 })
    @ApiProperty({
        description: 'Phone number of the user',
        example: '3216549870',
    })
    phone_number: string;

    @Column({ type: 'varchar', length: 255 })
    @ApiProperty({
        description: 'Address of the user',
        example: 'Riwi',
    })
    address: string;
    
    @Column({ type: 'varchar', length: 30, unique: true })
    @ApiProperty({
        description: 'Document number of the user',
        example: '12345678910',
    })
    doc_number: string;

    @Column({ default: false })
    @ApiProperty({
        description: 'User state',
        example: true,
    })
    isActive: boolean;
    
    @Column({ nullable: false, default: 1 })
    @ApiProperty({
        description: 'Role ID of the user',
        example: 2,
    })
    role_id: number;

    @Column({ nullable: false })
    @ApiProperty({
        description: 'Document type ID of the user',
        example: 1,
    })
    document_type_id: number;


    @Column({
        type: 'varchar', 
        unique: true, 
        name: 'reset_password_token', 
        nullable: true
    })
    @ApiProperty({
        description: 'Reset password token',
        example: "123e4567-e89b-12d3-a456-426614174055",
    })
      resetPasswordToken: string;
      


    @CreateDateColumn({ type: 'timestamp' })
    @ApiProperty({
        description: 'Date when the user was created',
        example: '2024-09-15T12:00:00Z',
       })
      created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @ApiProperty({
        description: 'Date when the user was last updated',
        example: '2024-09-15T12:00:00Z',
    })
    updated_at: Date;
    
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    @ApiProperty({
        description: 'Date when the user was deleted',
        example: '2024-09-15T12:00:00Z',
    })
    delete_at: Date;

    @ApiHideProperty()
    @OneToMany(() => Property, (property) => property.ownerId)
    properties: Property[];
    
    @ApiHideProperty()
    @OneToMany(() => Slot, (slot) => slot.owner)
    slots: Slot[];
    
    @ApiHideProperty()
    @OneToMany(() => Booking, (booking) => booking.ownerId)
    bookingsOwner: Booking[];
    
    @ApiHideProperty()
    @OneToMany(() => Booking, (booking) => booking.driverId)
    bookingsDriver: Booking[];

    @ApiHideProperty()
    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @ApiHideProperty()
    @ManyToOne(() => DocumentType, (documentType) => documentType.users)
    @JoinColumn({ name: 'document_type_id' })
    documentType: DocumentType;
}
