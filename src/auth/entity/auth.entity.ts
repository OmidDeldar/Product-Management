import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
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


    //validate password for sign in
    async validatePassword(password:string) : Promise<boolean>{
        const hash=await bcrypt.hash(password , this.salt);
        return hash === this.password
    }
}