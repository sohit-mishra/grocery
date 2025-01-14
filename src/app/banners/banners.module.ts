import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BannersController } from './banners.controller';
import { BannersService } from './banners.service';
import { Banner, BannerSchema } from './banner.model';
import {Categories_Model, CategoriesSchema } from '@app/categories/categories.model';  
import { Product, ProductSchema } from '@app/products/product.model';  

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),
    MongooseModule.forFeature([{ name: Categories_Model, schema: CategoriesSchema }]), 
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), 
  ],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
