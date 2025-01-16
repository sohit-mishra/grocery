import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDealsDto, CreateDealsResponse } from './dto/create-deals.dto';
import { Model } from 'mongoose';
import { UpdateDealParam, UpdateBodyDeals, UpdateDealsResponse } from './dto/update-deals.dto';
import { Deals_Model, DealsDocument } from './deals.model';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '@app/products/product.model';
import { Categories_Model, CategoriesDocument } from '@app/categories/categories.model';
import { DeleteDealsParam, DeleteDealsResponse } from './dto/delete-deals.dto';
import { StatusUpdateDealsBody, StatusUpdateDealsParam, StatusUpdateDealsResponse } from './dto/UpdateStatus-deals.dto';
import { OneDealsResponse } from './dto/One-deals.dto';
import { OneBannerParam } from '@app/banners/dto/one-banner.dto';
import { TypeDealsResponse } from './dto/Type-deals.dto';
import { AllDealsResponse, AllDealsQuery } from './dto/All-deals.dto';

@Injectable()
export class DealsService {
  constructor(
    @InjectModel(Deals_Model) private readonly dealsModel: Model<DealsDocument>,
    @InjectModel(Categories_Model) private readonly CategoryModel: Model<CategoriesDocument>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async findAll(query: AllDealsQuery): Promise<AllDealsResponse> {
    const { page = 1, limit = 10, q } = query;
    const skip = (page - 1) * limit;
    const filter = q ? { title: { $regex: q, $options: 'i' } } : {};

    const total = await this.dealsModel.countDocuments(filter).exec();
    const deals = await this.dealsModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    // Use Promise.all to handle concurrent asynchronous operations
    await Promise.all(deals.map(async (deal) => {
      if (deal.categoryId) {
        const category = await this.CategoryModel.findById(deal.categoryId).exec();
        deal.categoryName = category ? category.title : null;
      } else {
        deal.categoryName = null;
        deal.categoryId = null;
      }

      if (deal.productId) {
        const product = await this.productModel.findById(deal.productId).exec();
        deal.productName = product ? product.title : null;
      } else {
        deal.productName = null;
        deal.productId = null;
      }
    }));

    return {
      response_code: 200,
      response_data: deals,
      total,
    };
  }

  async findList(): Promise<TypeDealsResponse> {
    const type = {
      CATEGORY: 'CATEGORY',
      PRODUCT: 'PRODUCT',
    };
    return {
      response_code: 200,
      response_data: type,
    };
  }

  async findOne(param: OneBannerParam): Promise<OneDealsResponse> {
    const deal = await this.dealsModel.findById(param.id).exec();
    if (!deal) {
      throw new NotFoundException('Deal not found');
    }

    if (deal.categoryId) {
      const category = await this.CategoryModel.findById(deal.categoryId).exec();
      deal.categoryName = category ? category.title : null;
    } else {
      deal.categoryName = null;
      deal.categoryId = null;
    }

    if (deal.productId) {
      const product = await this.productModel.findById(deal.productId).exec();
      deal.productName = product ? product.title : null;
    } else {
      deal.productName = null;
      deal.productId = null;
    }

    return {
      response_code: 200,
      response_data: deal,
    };
  }

  async createOne(createDealsDto: CreateDealsDto): Promise<CreateDealsResponse> {
    const newDeal = new this.dealsModel(createDealsDto);
    await newDeal.save();

    return {
      response_code: 200,
      response_data: 'Deal Created Successfully',
    };
  }

  async updateOne(
    param: UpdateDealParam,
    update: UpdateBodyDeals,
  ): Promise<UpdateDealsResponse> {
    const updatedDeal = await this.dealsModel.findByIdAndUpdate(param.id, update, { new: true }).exec();
    if (!updatedDeal) {
      throw new NotFoundException('Deal not found');
    }

    return {
      response_code: 200,
      response_data: 'Deal Updated Successfully',
    };
  }

  async updateStatus(
    param: StatusUpdateDealsParam,
    status: StatusUpdateDealsBody,
  ): Promise<StatusUpdateDealsResponse> {
    const updatedDeal = await this.dealsModel.findByIdAndUpdate(param.id, { status }, { new: true }).exec();
    if (!updatedDeal) {
      throw new NotFoundException('Deal not found');
    }

    return {
      response_code: 200,
      response_data: 'Deal Status Updated Successfully',
    };
  }

  async deleteOne(param: DeleteDealsParam): Promise<DeleteDealsResponse> {
    const deletedDeal = await this.dealsModel.findByIdAndDelete(param.id).exec();
    if (!deletedDeal) {
      throw new NotFoundException('Deal not found');
    }

    return {
      response_code: 200,
      response_data: 'Deal Deleted Successfully',
    };
  }
}
