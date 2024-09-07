import { Column, PrimaryGeneratedColumn, Entity} from "typeorm";

@Entity()
export class Propierty {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    owner_id: string;

    @Column({
        type: 'text',
        nullable: false
    })
    address: string;

    @Column()
    image_url: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}