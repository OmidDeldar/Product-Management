import { ApiProperty } from "@nestjs/swagger";

export class AddToCartDto{
    @ApiProperty()
    productId:string;
}