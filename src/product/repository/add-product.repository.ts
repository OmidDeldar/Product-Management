import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/entity/auth.entity";
import { EntityRepository, Repository } from "typeorm";
import { AddToCartDto } from "../DTO/add-to-cart.dto";
import { AddProduct } from "../entity/add-product.entity";
import { Product } from "../entity/product.entity";
import { ProductService } from "../services/product.service";
import { ProductRepository } from "./product.repository";


@Injectable()
@EntityRepository(AddProduct)
export class AddProductRepository extends Repository<AddProduct>{

    private productService : ProductService;

    //add to cart
    async addToCart(addToCartDto:AddToCartDto,user:User,found:Product):Promise<AddProduct>{
        const {productId}=addToCartDto

        // const exist=await this.findOne({where: {productId:productId,userId:user.id}})

        // // if(found){
        // // exist.amount+=1;
        // // const saved_amount=await this.save(found);
        // // return saved_amount
        // // }
       
            
        const addProduct=new AddProduct();
        addProduct.productId=productId
        addProduct.productName=found.title
        addProduct.productPrice=found.price
        addProduct.productPicture=found.profile
        addProduct.userFullName=user.firstName+user.lastName;
        addProduct.userAddress=user.address;
        addProduct.userPhoneNumber=user.phoneNumber;
        addProduct.user=user;

        const saved=await this.save(addProduct);

        delete addProduct.user;
        return saved;
        
        
    }
}