import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../DTO/create-product.dto';
import { GetProductByTitleDto } from '../DTO/get-product-by-title.dto';
import { UpdateSaleDto } from '../DTO/update-sale.dto';
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

    //delete product by id
    @Delete('delete/:id')
    async deleteProduct(@Param('id') id:string):Promise<string>{
        return await this.productService.deleteProduct(id);
    }
    //update sale product
    @Patch('update/sale')
    async updateSale(@Body(ValidationPipe) updateSaleDto:UpdateSaleDto):Promise<Product>{
        return await this.productService.updateSale(updateSaleDto);
    }

    //find all product
    @Get('findAll')
    async findAll():Promise<Product[]>{
        return await this.productService.findAll();
    }

    //find product by title
    @Post('findBy/title')
    async findProductByTitle(@Body() getProductByTitleDto:GetProductByTitleDto):Promise<Product[]>{
        return await this.productService.findProductByTitle(getProductByTitleDto);
    }
}
