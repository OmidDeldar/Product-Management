import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDto} from "../DTO/Auth-Credential.dto";
import { User } from "../entity/auth.entity";
import * as bcrypt from 'bcrypt'
import { SignInDto } from "../DTO/sign-in.dto";
import { CompleteUserInfoDto } from "../DTO/completeUserInfo.dto";
import { RoleEnum } from "../enum/role.enum";

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
        user.role=[RoleEnum.USER]
        this.save(user);


    }

    //complete information about user
    async completeInfo(completeInfoDto:CompleteUserInfoDto,user:User):Promise<void>{
        const {firstname,lastname,address,phoneNumber}=completeInfoDto;

        const findUser=await this.findOne({id:user.id})

        findUser.firstName=firstname;
        findUser.lastName=lastname;
        findUser.address=address;
        findUser.phoneNumber=phoneNumber

        this.save(findUser);
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