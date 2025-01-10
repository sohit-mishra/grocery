import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategory } from './schema/subCategory.schema';
import { CreateSubCategoryDto } from './dto/create-subCategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subCategory.dto';
import { Categories } from '@app/categories/schema/categories.schema';

import {AllSubCategoryResponse,
  OneSubCategoryResponse,
  TypeSubCategoryResponse,
  CreateSubCategoryResponse,
  UpdateSubCategoryResponse,
  StatusUpdateSubCategoryResponse,
  DeleteSubCategoryResponse} from './dto/response.dto'

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name) private readonly subCategoryModel: Model<SubCategory>,
    @InjectModel(Categories.name) private readonly CategoryModel: Model<Categories>,
  ) {}

  async findAll(
    page: number,
    limit: number,
    search: string,
  ): Promise<AllSubCategoryResponse> {
    if (page <= 0 || limit <= 0) {
      throw new BadRequestException('Page and limit must be positive integers');
    }
  
    const skip = (page - 1) * limit;
  
    const query = search
      ? { title: { $regex: search, $options: 'i' } }
      : {};
  
    const subCategories = await this.subCategoryModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .exec();
  
    const total = await this.subCategoryModel.countDocuments(query).exec();
  
    for (const subCategory of subCategories) {
      if (subCategory.categoryId) {
        const category = await this.CategoryModel.findById(subCategory.categoryId).exec();
        subCategory.categoryName = category ? category.title : null;
      }
    }
  
    const response: AllSubCategoryResponse = {
      response_code: 200,
      response_data: subCategories,
      total: total,
    };
  
    return response;
  }
  

  async findType(id: string): Promise<OneSubCategoryResponse> {
    const subCategory = await this.subCategoryModel.findById(id).select('-__v').exec();
  
    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }
  
    const response: OneSubCategoryResponse = {
      response_code: 200,
      response_data:subCategory
      
    };
  
    return response;
  }
  


  async findOne(id: string):Promise<OneSubCategoryResponse> {
    const subCategory = await this.subCategoryModel.findById(id).select('-__v').exec();
    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }

    const response: OneSubCategoryResponse={
      response_code:200,
      response_data:subCategory
    }

    return response
  }

  async create(createSubCategoryDto: CreateSubCategoryDto):Promise<CreateSubCategoryResponse> {
    const newSubCategory = new this.subCategoryModel(createSubCategoryDto);
    await newSubCategory.save();
    const response: CreateSubCategoryResponse={
      response_code:200,
      response_data:"Subcategory saved succesfully"
    }

    return response
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto):Promise<UpdateSubCategoryResponse> {
    const updatedSubCategory = await this.subCategoryModel
      .findByIdAndUpdate(id, updateSubCategoryDto, { new: true })
      .exec();
    if (!updatedSubCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }

    const response: UpdateSubCategoryResponse={
      response_code:200,
      response_data:"Sub Category Update Successfully"
    }

    return response
  }

  async StatusUpdate(id: string, status: boolean):Promise<StatusUpdateSubCategoryResponse> {
    const updatedSubCategory = await this.subCategoryModel
      .findByIdAndUpdate(id,  { status }, { new: true })
      .exec();
    if (!updatedSubCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }

    const response: StatusUpdateSubCategoryResponse={
      response_code:200,
      response_data:"Sub Category Update Successfully"
    }

    return response
  }

  async remove(id: string):Promise<DeleteSubCategoryResponse> {
    const deletedSubCategory = await this.subCategoryModel.findByIdAndDelete(id).exec();
    if (!deletedSubCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }
    const response: DeleteSubCategoryResponse={
      response_code:200,
      response_data:"Sub Category deleted Successfully"
    }

    return response
  }
}
