import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './repository/product.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadFileConfigService } from 'src/uploadfile/upload-file.config.service';
import { AddProductRepository } from './repository/add-product.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductRepository,AddProductRepository]),
    AuthModule,
    MulterModule.registerAsync({useClass:UploadFileConfigService}),
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
