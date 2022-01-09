import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {

    @ApiProperty()
    title:string;

    @ApiProperty()
    description:string;

    @ApiProperty()
    price:number;

    @ApiProperty()
    sale:number;
    

}