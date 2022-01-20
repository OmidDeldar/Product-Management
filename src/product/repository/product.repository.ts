import { Injectable } from "@nestjs/common";
import { User } from "src/auth/entity/auth.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateProductDto } from "../DTO/create-product.dto";
import { Product } from "../entity/product.entity";
import { ProductService } from "../services/product.service";


@Injectable()
@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{
    private productService:ProductService;


    async createProduct(createProductDto:CreateProductDto,user:User):Promise<Product>{
        const {title,description,price,sale,category}=createProductDto;
        const product=new Product();
        product.category=category;
        product.title=title;
        product.description=description;
        product.price=price;
        product.sale=sale;
        product.user=user;
        
        const saved_product=await this.save(product);

        delete product.user;

        return saved_product;
    }

    
}