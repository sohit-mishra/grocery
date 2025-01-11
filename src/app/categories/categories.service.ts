import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategories } from './dto/create-categories.dto';
import { UpdateCategories } from './dto/update-categories.dto';
import { Categories } from './schema/categories.schema';
import { SubCategory } from '@app/sub-category/schema/subCategory.schema';
import { Deals } from '@app/deals/schema/deals.schema';
import { StorageService } from '@core/services/storage.service';
import {
  AllCategoriesResponse,
  DropdownCategoriesResponse,
  OneCategoriesResponse,
  CreateCategoriesResponse,
  UpdateCategoriesResponse,
  UpdateStatusCategoriesResponse,
  DeleteCategoriesResponse,
  ImageCategoriesResponse,
} from './dto/response.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name) private readonly categoriesModel: Model<Categories>,
    @InjectModel(Deals.name) private readonly dealsModel: Model<Deals>,
    @InjectModel(SubCategory.name) private readonly subCategoryModel: Model<SubCategory>,
    private readonly storageService: StorageService,
  ) {}

  async findAll(page: number = 1, limit: number = 10, search: string = ''): Promise<AllCategoriesResponse> {
    const skip = (page - 1) * limit;
    const searchRegex = search ? new RegExp(search, 'i') : null;
    const filter = searchRegex ? { $or: [{ name: searchRegex }, { description: searchRegex }] } : {};

    const [total, categories] = await Promise.all([
      this.categoriesModel.countDocuments(filter).exec(),
      this.categoriesModel.find(filter).skip(skip).limit(limit).select('-description -filePath -imageId -__v').exec(),
    ]);

    for (let category of categories) {
      const subCategoryCount = await this.subCategoryModel.countDocuments({ categoryId: category._id }).exec();
      const deals = await this.dealsModel.find({ categoryId: category._id }).exec();
      const isDealAvailable = deals.length > 0;
  
      category.set('subCategoryCount', subCategoryCount, { strict: false });
      category.set('isDealAvailable', isDealAvailable, { strict: false });
  
      if (isDealAvailable) {
        const dealPercent = Math.max(...deals.map((deal) => deal.dealPercent || 0));
        category.set('dealPercent', dealPercent, { strict: false });
      }
    }

    return {
      response_code: 200,
      response_data: categories,
      total,
    };
  }

  async getDropdownList(): Promise<DropdownCategoriesResponse> {
    const categories = await this.categoriesModel.find({}, { _id: 1, title: 1, status: 1 }).exec();
    const formattedCategories = categories.map((category) => ({
      id: category._id.toString(),
      name: category.title,
      status: category.status,
    }));

    const response: DropdownCategoriesResponse = {
      response_code: 200,
      response_data: formattedCategories,
    };

    return response;
  }

  async findOne(id: string): Promise<OneCategoriesResponse> {
    const category = await this.categoriesModel.findById(id).select('-__v').exec();

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const subCategoryCount = await this.subCategoryModel.countDocuments({ categoryId: category._id }).exec();
    const deals = await this.dealsModel.find({ categoryId: category._id }).exec();
    const isDealAvailable = deals.length > 0;

    category.set('subCategoryCount', subCategoryCount, { strict: false });
    category.set('isDealAvailable', isDealAvailable, { strict: false });

    if (isDealAvailable) {
      const dealPercent = Math.max(...deals.map((deal) => deal.dealPercent || 0));
      category.set('dealPercent', dealPercent, { strict: false });
    }

    const response: OneCategoriesResponse = {
      response_code: 200,
      response_data: category,
    };

    return response;
  }

  async uploadImage(file: { buffer: Buffer; originalname: string }): Promise<ImageCategoriesResponse> {
    try {
      const imageUploadResult = await this.storageService.uploadFile({
        buffer: file.buffer,
        originalname: file.originalname,
      });

      const response: ImageCategoriesResponse = {
        response_code: 200,
        response_data: {
          url: imageUploadResult.fileUrl,
          key: imageUploadResult.fileId,
          filePath: imageUploadResult.filePath,
        },
      };

      return response;
    } catch (error) {
      throw new Error('Image upload failed');
    }
  }

  async create(createCategoriesDto: CreateCategories): Promise<CreateCategoriesResponse> {
    const newCategory = new this.categoriesModel(createCategoriesDto);
    await newCategory.save();

    const response: CreateCategoriesResponse = {
      response_code: 200,
      response_data: 'Category saved successfully',
    };

    return response;
  }

  async update(id: string, updateCategoriesDto: UpdateCategories): Promise<UpdateCategoriesResponse> {
    const updatedCategory = await this.categoriesModel.findByIdAndUpdate(
      id,
      updateCategoriesDto,
      { new: true },
    ).exec();

    if (!updatedCategory) {
      throw new NotFoundException('Category not found');
    }

    const response: UpdateCategoriesResponse = {
      response_code: 200,
      response_data: 'Category updated successfully',
    };

    return response;
  }

  async updateStatus(id: string, status: boolean): Promise<UpdateStatusCategoriesResponse> {
    const updatedCategory = await this.categoriesModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    ).exec();

    if (!updatedCategory) {
      throw new NotFoundException('Category not found');
    }

    const response: UpdateStatusCategoriesResponse = {
      response_code: 200,
      response_data: 'Category status updated successfully',
    };

    return response;
  }

  async delete(id: string): Promise<DeleteCategoriesResponse> {
    const result = await this.categoriesModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException('Category not found');
    }

    const response: DeleteCategoriesResponse = {
      response_code: 200,
      response_data: 'Category deleted successfully',
    };

    return response;
  }
}
