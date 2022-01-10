import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthCredentialDto } from '../DTO/Auth-Credential.dto';
import { SignInDto } from '../DTO/sign-in.dto';
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

    @Post('signIn')
    async signIn(@Body(ValidationPipe) signInDto:SignInDto):Promise<{accessToken:string}>{
        return await this.authService.signIn(signInDto);
    }
}
