import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { Deals_Model, DealsSchema } from './deals.model';
import { Categories_Model, CategoriesSchema } from '@app/categories/categories.model';
import { Product, ProductSchema } from '@app/products/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Deals_Model, schema: DealsSchema },
      { name: Categories_Model, schema: CategoriesSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
