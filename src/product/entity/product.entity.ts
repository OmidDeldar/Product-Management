import { User } from "src/auth/entity/auth.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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

    @Column('simple-array',{nullable:true})
    profile:Array<string>;

    @ManyToOne(type => User , user => user.product , { eager : false})
    user:User;

}