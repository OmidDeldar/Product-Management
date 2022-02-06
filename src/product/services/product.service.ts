import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/auth.entity';
import { AddToCartDto } from '../DTO/add-to-cart.dto';
import { CreateProductDto } from '../DTO/create-product.dto';
import { GetProductByCategoryDto } from '../DTO/get-product-by-category.dto';
import { GetProductByTitleDto } from '../DTO/get-product-by-title.dto';
import { UpdatePriceDto } from '../DTO/update-price.dto';
import { AddProduct } from '../entity/add-product.entity';
import { Product } from '../entity/product.entity';
import { AddProductRepository } from '../repository/add-product.repository';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private productRepository:ProductRepository,
        @InjectRepository(AddProductRepository)
        private addProductRepository:AddProductRepository
    ){}

    //create product
    async createProduct(createProductDto:CreateProductDto,user:User):Promise<Product>{
        return await this.productRepository.createProduct(createProductDto,user);
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
    async updatePrice(updatePriceDto:UpdatePriceDto):Promise<Product>{
        const {id,price}=updatePriceDto;
        const found=await this.findProductById(id);

        found.price=price;
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

    //find product by category
    async findProductByCateogry(getProductByCategoryDto:GetProductByCategoryDto):Promise<Product[]>{
        const {category}=getProductByCategoryDto
        const found=await this.productRepository.find({where:{category:category}});

        if(!found)
        throw new NotFoundException(`category ${category} doesnt exist`);

        return found;
    }

    //upload product photo
    async uploadProfilePhoto(id:string,file:Express.Multer.File):Promise<any>{
        const found= await this.findProductById(id);

        if(!file)
        throw new BadRequestException();



        if(!Array.isArray(found.profile))
        found.profile=[];

        found.profile.push(file.originalname);

        
        
        const saved=await this.productRepository.save(found);

        return saved
    }

    //get picture
    async getPicture(fileName:string,res){
        if(!fileName)
        throw new BadRequestException();

        const response=res.sendFile(process.cwd()+'/uploads/'+fileName);

        return response
    }

    //add to cart
    async addToCart(addToCartDto:AddToCartDto,user:User):Promise<AddProduct>{
        return await this.addProductRepository.addToCart(addToCartDto,user);
    }
    
    //delete from cart
    async deleteFromCart(id:string,user:User):Promise<string>{
        const found=await this.addProductRepository.findOne({id:id});

        if(!found){
            throw new NotFoundException();
        }

        this.addProductRepository.delete(found);
        
        return 'delete successfully'
    }

    //get all in cart
    async getAllCart(user:User):Promise<AddProduct[]>{
        const found= await this.addProductRepository.find({user:user});
        
        return found
    }

    //purchased complete
    async purchasedComplete(user:User):Promise<AddProduct[]>{

        const date=new Date();
        const found=await this.addProductRepository.find({user:user});
        
        for (const iterator of found) {
            iterator.purchased=true
            iterator.date=date
        }

        const saved=await this.addProductRepository.save(found);
        

        return saved
    }
}