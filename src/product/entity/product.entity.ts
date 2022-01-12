import { type } from "os";
import { User } from "src/auth/entity/auth.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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

    @OneToMany(type => User , user => user.product , { eager : false})
    user:User;
}