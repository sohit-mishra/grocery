import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { Deals, DealsSchema } from './schema/deals.schema';
import { Categories, CategoriesSchema } from '@app/categories/schema/categories.schema';  
import { Product, ProductSchema } from '@app/products/schema/product.schema';  

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Deals.name, schema: DealsSchema },
      { name: Categories.name, schema: CategoriesSchema }, 
      { name: Product.name, schema: ProductSchema }, 
    ]),
  ],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
