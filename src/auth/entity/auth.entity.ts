import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Product } from "src/product/entity/product.entity";
import { AddProduct } from "src/product/entity/add-product.entity";
import { RoleEnum } from "../enum/role.enum";
import { cp } from "fs";
@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    username:string;

    @Column({nullable:true})
    firstName:string;

    @Column({nullable:true})
    lastName:string;

    @Column()
    password:string;

    @Column()
    email:string;
 
    @Column({nullable:true})
    address:string;

    @Column({nullable:true})
    phoneNumber:number

    @Column()
    salt:string;

    @Column({default:false})
    deleted:boolean;

    @Column('enum',{enum:RoleEnum,default:RoleEnum.USER})
    role:RoleEnum[]

    @OneToMany(type => Product , product => product.user , { eager : true})
    @JoinColumn()
    product:Product[];

    @OneToMany(type => AddProduct , addproduct => addproduct.user , {eager:true})
    @JoinColumn()
    addproduct:AddProduct[];

    //validate password for sign in
    async validatePassword(password:string) : Promise<boolean>{
        const hash=await bcrypt.hash(password , this.salt);
        return hash === this.password
    }
}