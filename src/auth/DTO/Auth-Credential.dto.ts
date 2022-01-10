import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, matches, MaxLength, MinLength } from "class-validator";
export class AuthCredentialDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty()
    username:string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty()
    firstname:string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty()
    lastname:string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
            ,{message:'password too weak'},
            )
    @ApiProperty()
    password:string;
}