import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductRepository])
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
