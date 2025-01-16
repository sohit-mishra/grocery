import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';
import { SubCategory_Model, SubCategorySchema } from './subCategory.model';
import { Categories_Model, CategoriesSchema } from '@app/categories/categories.model'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubCategory_Model, schema: SubCategorySchema },
      { name: Categories_Model, schema: CategoriesSchema },
    ]),
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}
