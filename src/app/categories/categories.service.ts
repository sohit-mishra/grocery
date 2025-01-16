import { BadRequestException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategories, CreateCategoriesResponse } from './dto/create-categories.dto';
import { UpdateBodyCategories, UpdateCategoriesParam, UpdateCategoriesResponse } from './dto/update-categories.dto';
import { Categories } from './categories.model';
import { SubCategory } from '@app/sub-category/subCategory.model';
import { Deals } from '@app/deals/deals.model';
import { StorageService } from '@core/services/storage.service';
import {
  AllCategoriesParam,
  AllCategoriesResponse,
} from './dto/All-categories.dto';
import {
  DeleteCategoriesParam,
  DeleteCategoriesResponse,
} from './dto/delete-categories.dto';
import { DropdownCategoriesResponse } from './dto/DropdownCategories.dto';
import { ImageCategoriesResponse } from './dto/ImageCategories.dto';
import {
  OneCategoriesParam,
  OneCategoriesResponse,
} from './dto/one-categories.dto';
import {
  UpdateStatusCategoriesParam,
  UpdateStatusCategoriesResponse,
  UpdateStatusCategories,
} from './dto/UpdateStatusCategories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name) private readonly categoriesModel: Model<Categories>,
    @InjectModel(Deals.name) private readonly dealsModel: Model<Deals>,
    @InjectModel(SubCategory.name) private readonly subCategoryModel: Model<SubCategory>,
    private readonly storageService: StorageService,
  ) {}

  async findAll(query: AllCategoriesParam): Promise<AllCategoriesResponse> {
    const { page = 1, limit = 10, q = '' } = query;
    const skip = (page - 1) * limit;
    const searchRegex = q ? new RegExp(q, 'i') : null;
    const filter = searchRegex ? { $or: [{ title: searchRegex }, { description: searchRegex }] } : {};

    const [total, categories] = await Promise.all([
      this.categoriesModel.countDocuments(filter).exec(),
      this.categoriesModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .select('-description -filePath -imageId -__v')
        .exec(),
    ]);

    return {
      response_code: 200,
      response_data: categories,
      total,
    };
  }

  async getDropdownList(): Promise<DropdownCategoriesResponse> {
    const categories = await this.categoriesModel.find({}, { _id: 1, title: 1, status: 1 }).exec();
    return {
      response_code: 200,
      response_data: categories.map((category) => ({
        id: category._id.toString(),
        name: category.title,
        status: category.status,
      })),
    };
  }

  async findOne(param: OneCategoriesParam): Promise<OneCategoriesResponse> {
    const id = param.id;
    const category = await this.categoriesModel.findById(id).select('-__v').exec();
    if (!category) throw new NotFoundException('Category not found');

    const subCategoryCount = await this.subCategoryModel.countDocuments({ categoryId: category._id }).exec();
    const deals = await this.dealsModel.find({ categoryId: category._id }).exec();
    const isDealAvailable = deals.length > 0;

    category.set('subCategoryCount', subCategoryCount, { strict: false });
    category.set('isDealAvailable', isDealAvailable, { strict: false });

    if (isDealAvailable) {
      const dealPercent = Math.max(...deals.map((deal) => deal.dealPercent || 0));
      category.set('dealPercent', dealPercent, { strict: false });
    }

    return {
      response_code: 200,
      response_data: category,
    };
  }

  async uploadImage(file: { buffer: Buffer; originalname: string }): Promise<ImageCategoriesResponse> {
    try {
      const imageUploadResult = await this.storageService.uploadFile({
        buffer: file.buffer,
        originalname: file.originalname,
      });

      return {
        response_code: 200,
        response_data: {
          url: imageUploadResult.fileUrl,
          key: imageUploadResult.fileId,
          filePath: imageUploadResult.filePath,
        },
      };
    } catch (error) {
      throw new BadRequestException('Image upload failed: ' + error.message);
    }
  }

  async create(createCategoriesDto: CreateCategories): Promise<CreateCategoriesResponse> {
    const newCategory = new this.categoriesModel(createCategoriesDto);
    await newCategory.save();
    return {
      response_code: 200,
      response_data: 'Category saved successfully',
    };
  }

  async update(param: UpdateCategoriesParam, updateCategoriesDto: UpdateBodyCategories): Promise<UpdateCategoriesResponse> {
    const updatedCategory = await this.categoriesModel.findByIdAndUpdate(
      param.id,
      updateCategoriesDto,
      { new: true },
    ).exec();

    if (!updatedCategory) {
      throw new NotFoundException('Category not found');
    }

    return {
      response_code: 200,
      response_data: 'Category updated successfully',
    };
  }

  async updateStatus(param:UpdateStatusCategoriesParam, status:UpdateStatusCategories): Promise<UpdateStatusCategoriesResponse> {
    const id = param.id;
    const updatedCategory = await this.categoriesModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    ).exec();

    if (!updatedCategory) {
      throw new NotFoundException('Category not found');
    }

    return {
      response_code: 200,
      response_data: 'Category status updated successfully',
    };
  }

  async delete(param:DeleteCategoriesParam): Promise<DeleteCategoriesResponse> {
    const {id} = param;
    const result = await this.categoriesModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Category not found');

    return {
      response_code: 200,
      response_data: 'Category deleted successfully',
    };
  }
}
