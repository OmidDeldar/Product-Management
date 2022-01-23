import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getUser } from '../decorator/get-user.decorator';
import { RoleGuardDecorator } from '../decorator/role-guard.decorator';
import { AuthCredentialDto } from '../DTO/Auth-Credential.dto';
import { SignInDto } from '../DTO/sign-in.dto';
import { User } from '../entity/auth.entity';
import { RoleEnum } from '../enum/role.enum';
import { JwtGuard } from '../guards/jwt.guard';
import { RoleGuard } from '../guards/role.guard';
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
    @RoleGuardDecorator(RoleEnum.ADMIN)
    @UseGuards(JwtGuard,RoleGuard)
    @Get('findAll')
    async findAll():Promise<User[]>{
        return await this.authService.findAll();
    }

    //find user by id
    @RoleGuardDecorator(RoleEnum.ADMIN)
    @UseGuards(JwtGuard,RoleGuard)
    @Get('find/:id')
    async findUserById(@Param('id') id:string):Promise<User>{
        return await this.authService.findUserById(id);
    }

    //delete user
    @UseGuards(JwtGuard)
    @Delete('delete/user')
    async deleteUser(@getUser() user:User):Promise<string>{
        return await this.authService.deleteUser(user);
    }
}
