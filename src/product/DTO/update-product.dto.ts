import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {

    @ApiProperty()
    category:string;

    @ApiProperty()
    title:string;

    @ApiProperty()
    description:string;

    @ApiProperty()
    price:number;



    
    

}