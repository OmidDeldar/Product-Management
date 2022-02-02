import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDto} from "../DTO/Auth-Credential.dto";
import { User } from "../entity/auth.entity";
import * as bcrypt from 'bcrypt'
import { SignInDto } from "../DTO/sign-in.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    //signUp for user
    async signUp(signUpDto:AuthCredentialDto):Promise<void>{
        const{username,email,password}=signUpDto;
        const exist=await this.findOne({username});
        if(exist)
        throw new BadRequestException(`username already exist`);

        const user=new User();
        user.username=username;
        user.email=email;
        user.salt=await bcrypt.genSalt();
        user.password=await this.hashPassword(password , user.salt);

        this.save(user);


    }

    //complete information about user
    async completeInfo(signUpDto:AuthCredentialDto,user:User):Promise<void>{
        const {firstname,lastname,address,phoneNumber}=signUpDto;

        user.firstName=firstname;
        user.lastName=lastname;
        user.address=address;
        user.phoneNumber=phoneNumber

        this.save(user);
    }

    //sign in 
    async validateUserPassword(signInDto:SignInDto): Promise<string>{
        const {username , password}=signInDto;
        const user=await this.findOne({username});
        if(user && await user.validatePassword(password))
            return username;
        else
            return null;
        
    }

    private async hashPassword(password:string,salt:string):Promise<string>{
        return bcrypt.hash(password,salt);
    }
}