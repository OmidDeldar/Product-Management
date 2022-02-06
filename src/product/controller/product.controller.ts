import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { getUser } from 'src/auth/decorator/get-user.decorator';
import { RoleGuardDecorator } from 'src/auth/decorator/role-guard.decorator';
import { User } from 'src/auth/entity/auth.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { RoleEnum } from 'src/auth/enum/role.enum';
import { AddToCartDto } from '../DTO/add-to-cart.dto';
import { CreateProductDto } from '../DTO/create-product.dto';
import { GetProductByCategoryDto } from '../DTO/get-product-by-category.dto';
import { GetProductByTitleDto } from '../DTO/get-product-by-title.dto';
import { UpdatePriceDto } from '../DTO/update-price.dto';
import { AddProduct } from '../entity/add-product.entity';
import { Product } from '../entity/product.entity';
import { ProductService } from '../services/product.service';
import { UpdateProductDto } from '../DTO/update-product.dto';

@ApiTags('products')
@Controller('product')
export class ProductController {
    constructor(private  productService : ProductService){}


    //create product
    @RoleGuardDecorator(RoleEnum.ADMIN)
    @UseGuards(JwtGuard,RoleGuard)
    @ApiBearerAuth('access-token')
    @Post('create')
    async createProduct(@Body(ValidationPipe) createProductDto:CreateProductDto,@getUser() user:User):Promise<Product>{
        return await this.productService.createProduct(createProductDto,user);
    }

    //find product by id
    @Get('find/:id')
    async findProductById(@Param('id') id:string):Promise<Product>{
        return await this.productService.findProductById(id);
    }

    //delete product by id
    @RoleGuardDecorator(RoleEnum.ADMIN)
    @UseGuards(JwtGuard,RoleGuard)
    @ApiBearerAuth('access-token')
    @Delete('delete/:id')
    async deleteProduct(@Param('id') id:string):Promise<string>{
        return await this.productService.deleteProduct(id);
    }


    //update sale product
    @RoleGuardDecorator(RoleEnum.ADMIN)
    @UseGuards(JwtGuard,RoleGuard)
    @ApiBearerAuth('access-token')
    @Patch('update/price')
    async updatePrice(@Body(ValidationPipe) updatePriceDto:UpdatePriceDto):Promise<Product>{
        return await this.productService.updatePrice(updatePriceDto);
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

    //find by category
    @Post('findby/category')
    async findProductByCategory(@Body() getProductByCategoryDto:GetProductByCategoryDto ):Promise<Product[]>{
        return await this.productService.findProductByCateogry(getProductByCategoryDto);
    }

    //upload product photo
    @RoleGuardDecorator(RoleEnum.ADMIN)
    @UseGuards(JwtGuard,RoleGuard)
    @ApiBearerAuth('access-token')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
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
    @UseGuards(JwtGuard)
    @ApiBearerAuth('access-token')
    @Post('addToCart')
    async addToCart(@Body() addToCartDto:AddToCartDto,@getUser() user:User):Promise<AddProduct>{
        return await this.productService.addToCart(addToCartDto,user);
    }

    //delete from cart
    @UseGuards(JwtGuard)
    @ApiBearerAuth('access-token')
    @Delete('deleteFromCart/:id')
    async deleteFromCart(@Param('id') id:string,@getUser() user:User):Promise<string>{
        return await this.productService.deleteFromCart(id,user);
    }

    //find all in cart
    @UseGuards(JwtGuard)
    @ApiBearerAuth('access-token')
    @Get('getAllCart')
    async getAllCart(@getUser() user:User):Promise<AddProduct[]>{
        return await this.productService.getAllCart(user);
    }



    //purchased complete
    @UseGuards(JwtGuard)
    @ApiBearerAuth('access-token')
    @Post('purchasedComplete')
    async purchasedComplete(@getUser() user:User):Promise<AddProduct[]>{
        return await this.productService.purchasedComplete(user);
    }

    @RoleGuardDecorator(RoleEnum.ADMIN)
    @UseGuards(JwtGuard,RoleGuard)
    @ApiBearerAuth('access-token')
    @Post('updateProduct/:id')
    async updateProduct(@Param('id') id:string,@Body() updateProductDto:UpdateProductDto,@getUser() user:User):Promise<Product>{
        return await this.productService.updateProduct(id,updateProductDto)
    }

    @RoleGuardDecorator(RoleEnum.ADMIN)
    @UseGuards(JwtGuard,RoleGuard)
    @ApiBearerAuth('access-token')
    @Get('findAllCart')
    async findAllCart():Promise<AddProduct[]>{
        return await this.productService.findAllCart();
    }


    @RoleGuardDecorator(RoleEnum.ADMIN)
    @UseGuards(JwtGuard,RoleGuard)
    @ApiBearerAuth('access-token')
    @Get('productAmount')
    async productAmount():Promise<number>{
        return await this.productService.productAmount();
    }

    @RoleGuardDecorator(RoleEnum.ADMIN)
    @UseGuards(JwtGuard,RoleGuard)
    @ApiBearerAuth('access-token')
    @Get('purchase/complete/amount')
    async purchaseCompletedAmount():Promise<number>{
        return await this.productService.purchaseCompletedAmount();
    }
    
}
