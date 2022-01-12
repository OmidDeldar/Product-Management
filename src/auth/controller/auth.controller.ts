import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthCredentialDto } from '../DTO/Auth-Credential.dto';
import { SignInDto } from '../DTO/sign-in.dto';
import { User } from '../entity/auth.entity';
import { AuthService } from '../services/auth.service';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    //signUp for user
    @Post('signUp')
    async signUp(@Body(ValidationPipe) signUpDto:AuthCredentialDto):Promise<void>{
        return await this.authService.signUp(signUpDto);
    }

    //signIn for user
    @Post('signIn')
    async signIn(@Body(ValidationPipe) signInDto:SignInDto):Promise<{accessToken:string}>{
        return await this.authService.signIn(signInDto);
    }
    
    //find all user
    @Get('findAll')
    async findAll():Promise<User[]>{
        return await this.authService.findAll();
    }

    //find user by id
    @Get('find/:id')
    async findUserById(@Param('id') id:string):Promise<User>{
        return await this.authService.findUserById(id);
    }

    //delete user
    @Delete('delete/:id')
    async deleteUser(@Param('id') id:string):Promise<string>{
        return await this.authService.deleteUser(id);
    }
}
