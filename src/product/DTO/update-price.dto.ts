import { ApiProperty } from "@nestjs/swagger";

export class UpdatePriceDto{
    @ApiProperty()
    id:string;

    @ApiProperty()
    price:number;
}