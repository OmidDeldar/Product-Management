import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { type } from "os";
import { Product } from "src/product/entity/product.entity";
@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    username:string;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column()
    password:string;

    @Column()
    salt:string;

    @Column({default:false})
    deleted:boolean;

    @OneToMany(type => Product , product => product.user , { eager : true})
    @JoinColumn()
    product:Product[];

    //validate password for sign in
    async validatePassword(password:string) : Promise<boolean>{
        const hash=await bcrypt.hash(password , this.salt);
        return hash === this.password
    }
}