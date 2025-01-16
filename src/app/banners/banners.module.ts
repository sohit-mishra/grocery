import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BannersController } from './banners.controller';
import { BannersService } from './banners.service';
import { Banner_Model, BannerSchema } from './banner.model';
import {
  Categories_Model,
  CategoriesSchema,
} from '@app/categories/categories.model';
import { Product_Model, ProductSchema } from '@app/products/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banner_Model, schema: BannerSchema }]),
    MongooseModule.forFeature([
      { name: Categories_Model, schema: CategoriesSchema },
    ]),
    MongooseModule.forFeature([{ name: Product_Model, schema: ProductSchema }]),
  ],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
