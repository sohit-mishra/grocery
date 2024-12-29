import { Module } from '@nestjs/common';
import { ProductOutOfStockService } from './product-out-of-stock.service';
import { ProductOutOfStockController } from './product-out-of-stock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../products/schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductOutOfStockController],
  providers: [ProductOutOfStockService],
})
export class ProductOutOfStockModule {}
