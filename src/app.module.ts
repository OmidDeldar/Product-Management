import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ProductModule,
    DatabaseModule],
})
export class AppModule {}
