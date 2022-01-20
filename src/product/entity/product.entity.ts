import { type } from "os";
import { User } from "src/auth/entity/auth.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddProduct } from "./add-product.entity";


@Entity()
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    category:string;

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
    
    @Column()
    userId:string;

    @OneToOne(type => AddProduct , addproduct => addproduct.product )
    @JoinColumn()
    addproduct:AddProduct;

    @Column({nullable:true})
    addproductId:string

}