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

        const exist=await this.findOne({where: {productId:found.id,userId:user.id}})

        if(exist){
        exist.amount+=1;
        const saved_amount=await this.save(exist);
        return saved_amount
        }
       
            
        const addProduct=new AddProduct();
        addProduct.productId=found.id
        addProduct.productName=found.title
        addProduct.productPrice=found.price
        addProduct.productPicture=found.profile
        addProduct.userFullName=user.firstName+" "+user.lastName;
        addProduct.userAddress=user.address;
        addProduct.userPhoneNumber=user.phoneNumber;
        addProduct.userId=user.id;

        const saved=await this.save(addProduct);

        
        return saved;
        
        
    }
}