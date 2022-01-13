import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateProductDto } from "../DTO/create-product.dto";
import { Product } from "../entity/product.entity";
import { ProductService } from "../services/product.service";


@Injectable()
@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{
    private productService:ProductService;


    async createProduct(createProductDto:CreateProductDto):Promise<Product>{
        const {title,description,price,sale}=createProductDto;
        const product=new Product();
        product.title=title;
        product.description=description;
        product.price=price;
        product.sale=sale;
        
        const saved_product=await this.save(product);

        return saved_product;
    }

    
}