import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategories } from './dto/create-categories.dto';
import { UpdateCategories } from './dto/update-categories.dto';
import { Categories } from './schema/categories.schema';

interface PaginatedResponse<T> {
  total: number;
  data: T[];
}

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name) private readonly CategoriesModel: Model<Categories>,
  ) {}

  async findAll(page: number = 1, limit: number = 10, search: string = ''): Promise<PaginatedResponse<Categories>> {
    const skip = (page - 1) * limit;
    const searchRegex = search ? new RegExp(search, 'i') : null;

    const filter = searchRegex
      ? { $or: [{ name: searchRegex }, { description: searchRegex }] }
      : {};

    const [total, data] = await Promise.all([
      this.CategoriesModel.countDocuments(filter).exec(),
      this.CategoriesModel.find(filter).skip(skip).limit(limit).exec(),
    ]);

    return { total, data };
  }

  async findOne(id: string): Promise<Categories | null> {
    return this.CategoriesModel.findById(id).exec();
  }

  async create(createCategoriesDto: CreateCategories): Promise<Categories> {
    const newCategories = new this.CategoriesModel(createCategoriesDto);
    return newCategories.save();
  }

  async update(id: string, updateCategoriesDto: UpdateCategories): Promise<Categories | null> {
    return this.CategoriesModel.findByIdAndUpdate(id, updateCategoriesDto, { new: true }).exec();
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.CategoriesModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
