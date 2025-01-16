import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import {
  SubCategory_Model,
  SubCategorySchema,
} from '@app/sub-category/subCategory.model';
import { Deals_Model, DealsSchema } from '@app/deals/deals.model';
import {
  Categories_Model,
  CategoriesSchema,
} from '@app/categories/categories.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categories_Model, schema: CategoriesSchema },
      { name: Deals_Model, schema: DealsSchema },
      { name: SubCategory_Model, schema: SubCategorySchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
