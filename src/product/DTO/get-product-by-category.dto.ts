import { ApiProperty } from "@nestjs/swagger";

export class GetProductByCategoryDto{
    @ApiProperty()
    category:string;
}