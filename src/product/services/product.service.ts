import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../DTO/create-product.dto';
import { Product } from '../entity/product.entity';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private productRepository:ProductRepository  
    ){}

    //create product
    async createProduct(createProductDto:CreateProductDto):Promise<Product>{
        return await this.productRepository.createProduct(createProductDto);
    }

    //find product by id
    async findProductById(id:string):Promise<Product>{
        const found=await this.productRepository.findOne({where :{id:id}})

        if(!found)
        throw new NotFoundException(`product with id:(${id}) doesnt exist`);

        return found;
    }
}
