import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BannersController } from './banners.controller';
import { BannersService } from './banners.service';
import { Banner, BannerSchema } from './schema/banner.schema';
import { Categories, CategoriesSchema } from '@app/categories/schema/categories.schema';  
import { Product, ProductSchema } from '@app/products/schema/product.schema';  

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),
    MongooseModule.forFeature([{ name: Categories.name, schema: CategoriesSchema }]), 
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), 
  ],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
