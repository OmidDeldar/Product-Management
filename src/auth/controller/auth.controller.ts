import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { getUser } from '../decorator/get-user.decorator';
import { RoleGuardDecorator } from '../decorator/role-guard.decorator';
import { AuthCredentialDto } from '../DTO/Auth-Credential.dto';
import { CompleteUserInfoDto } from '../DTO/completeUserInfo.dto';
import { PromoteUserToAdminDto } from '../DTO/promoteUserToAdmin.dto';
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
    @UseGuards(JwtGuard)
    @ApiBearerAuth('access-token')
    @Get('findAll')
    async findAll():Promise<User[]>{
        return await this.authService.findAll();
    }

    //find user by id
    
    @UseGuards(JwtGuard,RoleGuard)
    @ApiBearerAuth('access-token')
    @Get('find/:id')
    async findUserById(@Param('id') id:string):Promise<User>{
        return await this.authService.findUserById(id);
    }

    //delete user
    @UseGuards(JwtGuard)
    @ApiBearerAuth('access-token')
    @Delete('delete/user')
    async deleteUser(@getUser() user:User):Promise<string>{
        return await this.authService.deleteUser(user);
    }

    //promote user to admin
    @RoleGuardDecorator(RoleEnum.ADMIN)
    @UseGuards(JwtGuard,RoleGuard)
    @ApiBearerAuth('access-token')
    @Patch('promoteUserToAdmin')
    async promoteUserToAdmin(@Body() userId:PromoteUserToAdminDto):Promise<User>{
        return await this.authService.promoteUserToAdmin(userId);
    }

    //complete information about user
    @UseGuards(JwtGuard)
    @ApiBearerAuth('access-token')
    @Post('completeUserInfo')
    async completeInfo(@Body() completeInfoDto:CompleteUserInfoDto , @getUser() user:User):Promise<void>{
        return await this.authService.completeInfo(completeInfoDto,user);
    }

    @RoleGuardDecorator(RoleEnum.ADMIN)
    @UseGuards(JwtGuard,RoleGuard)
    @ApiBearerAuth('access-token')
    @Get('userAmounts')
    async userAmount():Promise<number>{
        return await this.authService.userAmount();
    }

}
