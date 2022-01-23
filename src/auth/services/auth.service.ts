import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from '../DTO/Auth-Credential.dto';
import { SignInDto } from '../DTO/sign-in.dto';
import { User } from '../entity/auth.entity';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { UserRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
        private jwtService:JwtService
    ){}

    //signup user
    async signUp(signUpDto:AuthCredentialDto):Promise<void>{
        return await this.userRepository.signUp(signUpDto)
    }

    //signin user{
    async signIn(signInDto:SignInDto):Promise<{accessToken:string}>{
        const username=await this.userRepository.validateUserPassword(signInDto);
        const findRole=await this.userRepository.findOne({username});
        if(!username)
        throw new UnauthorizedException('invalid username or password');

        const role=findRole.role;
        const payload:JwtPayload={username,role};
        const accessToken=await this.jwtService.sign(payload);
        
        return {accessToken};
    }

    //find all user
    async findAll():Promise<User[]>{
        const found=await this.userRepository.find({where :{deleted:false}});

        return found;
    }
    //find user by id
    async findUserById(id:string):Promise<User>{
        const found=await this.userRepository.findOne({id});

        if(!found)
        throw new NotFoundException(`user with id ${id} doesnt exist`);

        return found
    }
    //delete user
    async deleteUser(user:User):Promise<string>{
        const {id}=user;
        const found=await this.findUserById(id);

        found.deleted=true;

        this.userRepository.save(found);

        return 'delete successfully';
    }
}
