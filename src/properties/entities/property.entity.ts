import { ApiHideProperty } from "@nestjs/swagger";
import { Commune } from "src/common/entities/commune.entity";
import { Slot } from "src/slots/entities/slot.entity";
import { User } from "src/users/entities/user.entity";
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    address: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    image_url: string;

    @Column({ type: 'int', nullable: false })
    commune_id: number;

    @Column({ type: 'varchar', nullable: false })
    owner_id: string;

    @CreateDateColumn({ type: 'timestamp' })
    crearted_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    delete_at: Date;

    @ApiHideProperty()
    @OneToMany(() => Slot, (slot) => slot.property)
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