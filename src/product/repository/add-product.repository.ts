import { Injectable } from "@nestjs/common";
import { User } from "src/auth/entity/auth.entity";
import { EntityRepository, Repository } from "typeorm";
import { AddToCartDto } from "../DTO/add-to-cart.dto";
import { AddProduct } from "../entity/add-product.entity";
import { ProductService } from "../services/product.service";


@Injectable()
@EntityRepository(AddProduct)
export class AddProductRepository extends Repository<AddProduct>{
    private productService : ProductService;

    //add to cart
    async addToCart(addToCartDto:AddToCartDto,user:User):Promise<AddProduct>{
        const {productId}=addToCartDto
        const addProduct=new AddProduct();
        addProduct.productId=productId;
        addProduct.user=user;

        const saved=await this.save(addProduct);

        return saved;
    }
}