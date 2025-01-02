import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategory } from './schema/subCategory.dto';
import { CreateSubCategoryDto } from './dto/create-subCategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subCategory.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name) private readonly subCategoryModel: Model<SubCategory>,
  ) {}

  async findAll(page: number, limit: number, search: string) {
    if (page <= 0 || limit <= 0) {
      throw new BadRequestException('Page and limit must be positive integers');
    }

    const skip = (page - 1) * limit;

    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    const subCategories = await this.subCategoryModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.subCategoryModel.countDocuments(query).exec();

    return { data: subCategories, total };
  }

  async findOne(id: string) {
    const subCategory = await this.subCategoryModel.findById(id).exec();
    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }
    return subCategory;
  }

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const newSubCategory = new this.subCategoryModel(createSubCategoryDto);
    return newSubCategory.save();
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
    const updatedSubCategory = await this.subCategoryModel
      .findByIdAndUpdate(id, updateSubCategoryDto, { new: true })
      .exec();
    if (!updatedSubCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }
    return updatedSubCategory;
  }

  async remove(id: string) {
    const deletedSubCategory = await this.subCategoryModel.findByIdAndDelete(id).exec();
    if (!deletedSubCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }
    return deletedSubCategory;
  }
}
