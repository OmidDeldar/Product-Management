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

        // const found=await this.findOne({where: {id:productId,userId:user.id}})

        // if(found)
        // found.amount+=1;
        // const saved=await this.save(found);
        // return saved
        
        
        const addProduct=new AddProduct();
        addProduct.productId=productId;
        addProduct.user=user;

        const saved=await this.save(addProduct);

        delete addProduct.user;
        return saved;
        
    }
}