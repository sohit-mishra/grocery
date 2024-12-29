import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategory } from './schema/subCategory.dto';
import { CreateSubCategoryDto } from './dto/create-subCategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subCategory.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name) private readonly subCategoryModel: Model<SubCategory>
  ) {}

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const subCategories = await this.subCategoryModel.find().skip(skip).limit(limit).exec();
    const total = await this.subCategoryModel.countDocuments().exec();
    return { data: subCategories, total };
  }

  async findOne(id: string) {
    return this.subCategoryModel.findById(id).exec();
  }

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const newSubCategory = new this.subCategoryModel(createSubCategoryDto);
    return newSubCategory.save();
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
    return this.subCategoryModel.findByIdAndUpdate(id, updateSubCategoryDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.subCategoryModel.findByIdAndDelete(id).exec();
  }
}
