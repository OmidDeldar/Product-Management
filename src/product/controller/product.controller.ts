import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { getUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/entity/auth.entity';
import { AddToCartDto } from '../DTO/add-to-cart.dto';
import { CreateProductDto } from '../DTO/create-product.dto';
import { GetProductByCategoryDto } from '../DTO/get-product-by-category.dto';
import { GetProductByTitleDto } from '../DTO/get-product-by-title.dto';
import { UpdateSaleDto } from '../DTO/update-sale.dto';
import { AddProduct } from '../entity/add-product.entity';
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

    @Post('findby/category')
    async findProductByCategory(@Body() getProductByCategoryDto:GetProductByCategoryDto ):Promise<Product[]>{
        return await this.productService.findProductByCateogry(getProductByCategoryDto);
    }

    //upload product photo
    @Post('upload/photo/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProductPhoto(@Param('id') id:string,@UploadedFile('file') file:Express.Multer.File):Promise<any>{
        return await this.productService.uploadProfilePhoto(id,file);
    }

    //get picture
    @Get('pictures/:filename')
    async getPicture(@Param('filename') fileName:string , @Res() res){
        return await this.productService.getPicture(fileName,res);
    }

    //add to cart
    @UseGuards(AuthGuard())
    @Post('addToCart')
    async addToCart(@Body() addToCartDto:AddToCartDto,@getUser() user:User):Promise<AddProduct>{
        return await this.productService.addToCart(addToCartDto,user);
    }
}
