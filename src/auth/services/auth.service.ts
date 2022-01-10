import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from '../DTO/Auth-Credential.dto';
import { SignInDto } from '../DTO/sign-in.dto';
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
    async signIn(signInInDto:SignInDto):Promise<{accessToken:string}>{
        const username=await this.userRepository.validateUserPassword(signInInDto);

        if(!username)
        throw new UnauthorizedException('invalid username or password');

        const payload:JwtPayload={username};
        const accessToken=await this.jwtService.sign(payload);
        
        return {accessToken};
    }
}
