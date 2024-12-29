import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';
import { SubCategory, SubCategorySchema } from './schema/subCategory.dto';  

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SubCategory.name, schema: SubCategorySchema }]), 
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}
