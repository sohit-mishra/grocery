import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategory } from './subCategory.model';
import { CreateSubCategoryDto, CreateSubCategoryResponse } from './dto/create-subCategory.dto';
import { UpdateSubCategoryBody, UpdateSubCategoryParam, UpdateSubCategoryResponse } from './dto/update-subCategory.dto';
import { Categories } from '@app/categories/categories.model';
import {
  StatusUpdateSubCategoryResponse,
  StatusUpdateSubCategoryParam,
  StatusUpdateSubCategoryBody,
} from './dto/statusupdateSubCategory.dto';
import { AllSubCategoryQuery, AllSubCategoryResponse } from './dto/All-subCategory.dto';
import { OneSubCategoryParam, OneSubCategoryResponse } from './dto/one-subCategory.dto';
import { DeleteSubCategoryParam, DeleteSubCategoryResponse } from './dto/delete-subCategory.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name) private readonly subCategoryModel: Model<SubCategory>,
    @InjectModel(Categories.name) private readonly CategoryModel: Model<Categories>,
  ) {}


  async findAll(queryParams: AllSubCategoryQuery): Promise<AllSubCategoryResponse> {
    const { page, limit, q: search } = queryParams;

    if (page <= 0 || limit <= 0) {
      throw new BadRequestException('Page and limit must be positive integers');
    }

    const skip = (page - 1) * limit;
    const filterQuery = search ? { title: { $regex: search, $options: 'i' } } : {};

    const subCategories = await this.subCategoryModel
      .find(filterQuery)
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .exec();

    const total = await this.subCategoryModel.countDocuments(filterQuery).exec();

    for (const subCategory of subCategories) {
      if (subCategory.categoryId) {
        const category = await this.CategoryModel.findById(subCategory.categoryId).exec();
        subCategory.categoryName = category ? category.title : null;
      }
    }

    return {
      response_code: 200,
      response_data: subCategories,
      total: total,
    };
  }

  async findType(param: OneSubCategoryParam): Promise<OneSubCategoryResponse> {
    const { id } = param;
    const subCategory = await this.subCategoryModel.findById(id).select('-__v').exec();

    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }

    return {
      response_code: 200,
      response_data: subCategory,
    };
  }


  async findOne(param: OneSubCategoryParam): Promise<OneSubCategoryResponse> {
    const { id } = param;
    const subCategory = await this.subCategoryModel.findById(id).select('-__v').exec();

    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }

    return {
      response_code: 200,
      response_data: subCategory,
    };
  }

  async create(createSubCategoryDto: CreateSubCategoryDto): Promise<CreateSubCategoryResponse> {
    const newSubCategory = new this.subCategoryModel(createSubCategoryDto);
    await newSubCategory.save();

    return {
      response_code: 200,
      response_data: 'Subcategory saved successfully',
    };
  }

  async update(
    param: UpdateSubCategoryParam,
    updateSubCategoryDto: UpdateSubCategoryBody,
  ): Promise<UpdateSubCategoryResponse> {
    const { id } = param;
    const updatedSubCategory = await this.subCategoryModel
      .findByIdAndUpdate(id, updateSubCategoryDto, { new: true })
      .exec();

    if (!updatedSubCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }

    return {
      response_code: 200,
      response_data: 'Sub Category updated successfully',
    };
  }

  async updateStatus(
    param: StatusUpdateSubCategoryParam,
    updateStatusBody: StatusUpdateSubCategoryBody,
  ): Promise<StatusUpdateSubCategoryResponse> {
    const { id } = param;
    const { status } = updateStatusBody;

    const updatedSubCategory = await this.subCategoryModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();

    if (!updatedSubCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }

    return {
      response_code: 200,
      response_data: 'Sub Category status updated successfully',
    };
  }

  async remove(param: DeleteSubCategoryParam): Promise<DeleteSubCategoryResponse> {
    const { id } = param;
    const deletedSubCategory = await this.subCategoryModel.findByIdAndDelete(id).exec();

    if (!deletedSubCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }

    return {
      response_code: 200,
      response_data: 'Sub Category deleted successfully',
    };
  }
}
