import { ApiProperty } from "@nestjs/swagger";

export class UpdateSaleDto{
    @ApiProperty()
    id:string;

    @ApiProperty()
    sale:number;
}