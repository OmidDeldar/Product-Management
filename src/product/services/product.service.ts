import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../DTO/create-product.dto';
import { GetProductByTitleDto } from '../DTO/get-product-by-title.dto';
import { UpdateSaleDto } from '../DTO/update-sale.dto';
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
        const found=await this.productRepository.findOne({where :{id:id,deleted:false}})

        if(!found)
        throw new NotFoundException(`product with id:(${id}) doesnt exist`);

        return found;
    }

    //delete Product by id
    async deleteProduct(id:string):Promise<string>{
        
        const found=await this.findProductById(id);

        found.deleted=true;
        this.productRepository.save(found);

        return 'delete successfully';
    }


    //upadte sale
    async updateSale(updateSaleDto:UpdateSaleDto):Promise<Product>{
        const {id,sale}=updateSaleDto;
        const found=await this.findProductById(id);

        found.sale=sale;
        const saved=this.productRepository.save(found);
        return saved;
    }

    //find all product
    async findAll():Promise<Product[]>{
        const found=await this.productRepository.find({where :{deleted:false}});

        return found;
    }

    //find product by title
    async findProductByTitle(getProductByTitleDto:GetProductByTitleDto):Promise<Product[]>{
        const {title}=getProductByTitleDto
        const found=await this.productRepository.find({where :{title:title}});

        if(!found)
        throw new NotFoundException();

        return found;

        
    }

}