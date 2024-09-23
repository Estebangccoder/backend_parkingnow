import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Commune } from "../../common/entities/commune.entity";
import { Slot } from "../../slots/entities/slot.entity";
import { User } from "../../users/entities/user.entity";
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        description: 'ID of the property',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    @ApiProperty({
        description: 'Name of the property',
        example: 'Riwi',
    })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    @ApiProperty({
        description: 'Address of the property',
        example: 'Riwi',
    })
    address: string;

    @Column({ type: 'varchar', length: 255 })
    @ApiProperty({
        description: 'Description of the property',
        example: 'Parqueadero de riwi',
    })
    description: string;

    @Column({ type: 'text', nullable: false })
    @ApiProperty({
        description: 'Image URL of the property',
        example: 'https://example.com/images/property.jpg',
    })
    image_url: string;

    @Column({ type: 'int', nullable: false })
    @ApiProperty({
        description: 'ID of the commune where the property is located',
        example: 1,
    })
    commune_id: number;

    @Column({ type: 'varchar', nullable: false })
    @ApiProperty({
        description: 'ID of the user who owns the property',
        example: '324f0caf-2501-4fe0-a7be-216afb0c5dff',
    })
    owner_id: string;

    @CreateDateColumn({ type: 'timestamp' })
    @ApiProperty({
        description: 'Date when the property was created',
        example: '2024-09-15T12:00:00Z',
    })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @ApiProperty({
        description: 'Date when the property was last updated',
        example: '2024-09-15T12:00:00Z',
    })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    @ApiProperty({
        description: 'Date when the property was deleted',
        example: '2024-09-15T12:00:00Z',
    })
    delete_at: Date;

    @ApiHideProperty()
    @OneToMany(() => Slot, (slot) => slot.property, { onDelete: "CASCADE", cascade: true })
    slots: Slot[];

    @ApiHideProperty()
    @ManyToOne(() => User, (user) => user.properties)
    @JoinColumn({ name: 'owner_id' })
    ownerId: User;

    @ApiHideProperty()
    @ManyToOne(() => Commune, (commune) => commune.properties)
    @JoinColumn({ name: 'commune_id' })
    commune: Commune;
}
