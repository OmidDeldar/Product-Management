import { ApiProperty } from "@nestjs/swagger";

export class GetProductByTitleDto{
    @ApiProperty()
    title:string;
}