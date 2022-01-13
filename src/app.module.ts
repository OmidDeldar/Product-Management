import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UploadfileModule } from './uploadfile/uploadfile.module';

@Module({
  imports: [
    ProductModule,
    DatabaseModule,
    AuthModule,
    UploadfileModule],
})
export class AppModule {}
