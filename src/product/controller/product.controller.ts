import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../DTO/create-product.dto';
import { Product } from '../entity/product.entity';
import { ProductService } from '../services/product.service';

@ApiTags('products')
@Controller('product')
export class ProductController {
    constructor(private  productService : ProductService){}


    //create product
    @Post('create')
    async createProduct(@Body(ValidationPipe) createProductDto:CreateProductDto):Promise<Product>{
        return await this.productService.createProduct(createProductDto);
    }

    //find product by id
    @Get('find/:id')
    async findProductById(@Param('id') id:string):Promise<Product>{
        return await this.productService.findProductById(id);
    }
}
