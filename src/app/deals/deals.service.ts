import { Injectable } from '@nestjs/common';
import { CreateDealsDto } from './dto/create-deals.dto';
import { Model } from 'mongoose';
import { UpdateDealsDto } from './dto/update-deals.dto';
import { Deals } from './schema/deals.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '@app/products/schema/product.schema';
import { Categories } from '@app/categories/schema/categories.schema';
import {
  AllDealsResponse,
  OneDealsResponse,
  CreateDealsResponse,
  TypeDealsResponse,
  StatusUpdateDealsResponse,
  UpdateDealsResponse,
  DeleteDealsResponse,
} from './dto/response.dto';

@Injectable()
export class DealsService {
  constructor(
    @InjectModel(Deals.name) private readonly dealsModel: Model<Deals>,
    @InjectModel(Categories.name) private readonly CategoryModel: Model<Categories>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async findAll({
    page,
    limit,
    search,
  }: {
    page: number;
    limit: number;
    search: string;
  }): Promise<AllDealsResponse> {
    const skip = (page - 1) * limit;
    const filter = search ? { title: { $regex: search, $options: 'i' } } : {};

    const total = await this.dealsModel.countDocuments(filter).exec();

    const deals = await this.dealsModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    
    for (let deal of deals) {
      if (deal.categoryId) {
        const category = await this.CategoryModel.findById(deal.categoryId);
        deal.categoryName = category ? category.title : null;
      }else{
        deal.categoryName = null;
        deal.categoryId = null;
      }

      if (deal.productId) {
        const product = await this.productModel.findById(deal.productId);
        deal.productName = product ? product.title : null;
      }else{
          deal.productName = null;
          deal.productId = null;
      }
    }

    const response: AllDealsResponse = {
      response_code: 200,
      response_data: deals,
      total,
    };
    return response;
  }

  async findlist(): Promise<TypeDealsResponse> {
    const type = {
      CATEGORY: 'CATEGORY',
      PRODUCT: 'PRODUCT',
    };
    const response: TypeDealsResponse = {
      response_code: 200,
      response_data: type,
    };
    return response;
  }

  async findOne(id: string): Promise<OneDealsResponse> {
    const deal = await this.dealsModel.findById(id).exec();
    if (!deal) {
      throw new Error('Deal not found');
    }

    if (deal.categoryId) {
      const category = await this.CategoryModel.findById(deal.categoryId);
      deal.categoryName = category ? category.title : null;
    } else {
      deal.categoryName = null;
      deal.categoryId = null;
    }
  
    if (deal.productId) {
      const product = await this.productModel.findById(deal.productId);
      deal.productName = product ? product.title : null;
    } else {
      deal.productName = null;
      deal.productId = null;
    }

    const response: OneDealsResponse = {
      response_code: 200,
      response_data: deal,
    };
    return response;
  }

  async createOne(createDealsDto: CreateDealsDto): Promise<CreateDealsResponse> {
    const newDeal = new this.dealsModel(createDealsDto);
    await newDeal.save();

    const response: CreateDealsResponse = {
      response_code: 200,
      response_data: 'Deal Created Successfully',
    };
    return response;
  }

  async updateOne(
    id: string,
    updateDealsDto: UpdateDealsDto,
  ): Promise<UpdateDealsResponse> {
    await this.dealsModel.findByIdAndUpdate(id, updateDealsDto, { new: true }).exec();

    const response: UpdateDealsResponse = {
      response_code: 200,
      response_data: 'Deal Updated Successfully',
    };
    return response;
  }

  async updateStatus(id: string, status: boolean): Promise<StatusUpdateDealsResponse> {
    await this.dealsModel.findByIdAndUpdate(id, { status }, { new: true }).exec();

    const response: StatusUpdateDealsResponse = {
      response_code: 200,
      response_data: 'Deal Status Updated Successfully',
    };
    return response;
  }

  async deleteOne(id: string): Promise<DeleteDealsResponse> {
    await this.dealsModel.findByIdAndDelete(id).exec();

    const response: DeleteDealsResponse = {
      response_code: 200,
      response_data: 'Deal Deleted Successfully',
    };
    return response;
  }
}
