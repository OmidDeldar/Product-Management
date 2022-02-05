import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from '../DTO/Auth-Credential.dto';
import { CompleteUserInfoDto } from '../DTO/completeUserInfo.dto';
import { PromoteUserToAdminDto } from '../DTO/promoteUserToAdmin.dto';
import { SignInDto } from '../DTO/sign-in.dto';
import { User } from '../entity/auth.entity';
import { RoleEnum } from '../enum/role.enum';
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
        const userId=findRole.id
        const payload:JwtPayload={username,role,userId};
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

    //promote user to admin
    async promoteUserToAdmin(userid:PromoteUserToAdminDto):Promise<User>{
        const {id}=userid
        const found=await this.findUserById(id);
        
        if(found.role.includes(RoleEnum.ADMIN))
        throw new ConflictException('user already is admin');

        found.role.push(RoleEnum.ADMIN);

        const saved_user=await this.userRepository.save(found);

        return saved_user;
    }

    //complete information about user
    async completeInfo(completeInfoDto:CompleteUserInfoDto,user:User):Promise<void>{
        return await this.userRepository.completeInfo(completeInfoDto,user)
    }


}
