import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import {
  SubCategory,
  SubCategorySchema,
} from '@app/sub-category/schema/subCategory.schema';
import { Deals, DealsSchema } from '@app/deals/schema/deals.schema';
import {
  Categories,
  CategoriesSchema,
} from '@app/categories/schema/categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categories.name, schema: CategoriesSchema },
      { name: Deals.name, schema: DealsSchema },
      { name: SubCategory.name, schema: SubCategorySchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
