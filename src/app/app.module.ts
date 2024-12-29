import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@core/core.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BannersModule } from './banners/banners.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ProductOutOfStockModule } from './product-out-of-stock/product-out-of-stock.module';
import { CouponsModule } from './coupons/coupons.module';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    BannersModule,
    CategoriesModule,

    CouponsModule,


    ProductOutOfStockModule,
    ProductsModule,
    SubCategoryModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
