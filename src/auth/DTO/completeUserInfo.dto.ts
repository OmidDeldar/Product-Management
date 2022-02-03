import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString,MaxLength, MinLength } from "class-validator";
export class CompleteUserInfoDto{

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty()
    firstname:string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty()
    lastname:string;

    @IsString()
    @MinLength(4)
    @MaxLength(30)
    @ApiProperty()
    address:string;

    @IsNumber()
    @MinLength(7)
    @MaxLength(15)
    @ApiProperty()
    phoneNumber:number;



}