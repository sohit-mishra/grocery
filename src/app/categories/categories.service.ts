import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategories } from './dto/create-categories.dto';
import { UpdateCategories } from './dto/update-categories.dto';
import { Categories } from './schema/categories.schema'; // Ensure this is your schema

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name) private categoryModel: Model<Categories>,
  ) {}

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const data = await this.categoryModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.categoryModel.countDocuments().exec();

    return { data, total };
  }

  
  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }


  async create(createCategoryDto: CreateCategories) {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  
  async update(id: string, updateCategoryDto: UpdateCategories) {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

 
  async remove(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
}
