import { User } from "src/auth/entity/auth.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class AddProduct extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ManyToOne(type => User, user => user.addproduct , {eager : false})
    @JoinColumn()
    user:User;

    @Column()
    userId:string;

    @OneToOne(type => Product , product => product.addproduct)
    @JoinColumn()
    product:Product;

    @Column()
    productId:string;

    @Column({default:false})
    purchased:boolean;

    @Column({default:1})
    amount:number;
}