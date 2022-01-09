import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    price:number;

    @Column()
    sale:number;

    @Column({default:false})
    deleted:boolean;
}