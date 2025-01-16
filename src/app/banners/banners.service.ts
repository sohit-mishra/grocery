import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Banner } from './banner.model';
import { Product } from '@app/products/product.model';
import { Categories } from '@app/categories/categories.model';
import { Model } from 'mongoose';
import { CreateBannerDto, CreateBannerResponse } from './dto/create-banner.dto';
import { UpdateBannerParam, UpdateBannerResponse, UpdateBodyBanner } from './dto/update-banner.dto';
import { DeleteBannerParam, DeleteBannerResponse } from './dto/delete-banner.dto';
import { TypeBannerResponse } from './dto/type-banner.dto';
import { OneBannerParam, OneBannerResponse } from './dto/one-banner.dto';
import { AllBannerResponse, AllBannerQuery } from './dto/All-banner.dto';

@Injectable()
export class BannersService {
  constructor(
    @InjectModel(Banner.name) private readonly bannerModel: Model<Banner>,
    @InjectModel(Categories.name) private readonly categoryModel: Model<Categories>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async findAll(query: AllBannerQuery): Promise<AllBannerResponse> {
    const { page = 1, limit = 10, q = '' } = query;
    const skip = (page - 1) * limit;
    const searchQuery = q ? { title: { $regex: q, $options: 'i' } } : {};

    const banners = await this.bannerModel
      .find(searchQuery)
      .skip(skip)
      .limit(limit)
      .select('-createdAt -updatedAt -__v')
      .exec();

    for (const banner of banners) {
      if (banner.categoryId) {
        const category = await this.categoryModel.findById(banner.categoryId).exec();
        banner.categoryName = category ? category.title : null;
      }
      if (banner.productId) {
        const product = await this.productModel.findById(banner.productId).exec();
        banner.productName = product ? product.title : null;
      }
    }

    const total = await this.bannerModel.countDocuments(searchQuery).exec();

    return {
      response_code: 200,
      response_data: banners,
      total,
    };
  }

  async findOne(params: OneBannerParam): Promise<OneBannerResponse> {
    const { id } = params;
    const banner = await this.bannerModel
      .findById(id)
      .select('-createdAt -updatedAt -__v -status')
      .exec();

    if (!banner) {
      throw new NotFoundException('Banner not found');
    }

    if (banner.categoryId) {
      const category = await this.categoryModel.findById(banner.categoryId).exec();
      banner.categoryName = category ? category.title : null;
    }
    if (banner.productId) {
      const product = await this.productModel.findById(banner.productId).exec();
      banner.productName = product ? product.title : null;
    }

    return {
      response_code: 200,
      response_data: banner,
    };
  }

  async findlist(): Promise<TypeBannerResponse> {
    const data = {
      CATEGORY: 'CATEGORY',
      PRODUCT: 'PRODUCT',
    };

    return {
      response_code: 200,
      response_data: data,
    };
  }

  async createOne(body: CreateBannerDto): Promise<CreateBannerResponse> {
    try {
      const newBanner = new this.bannerModel(body);
      await newBanner.save();

      return {
        response_code: 200,
        response_data: 'Banner saved successfully',
      };
    } catch (error) {
      throw new Error('Failed to create banner: ' + error.message);
    }
  }

  async updateOne(
    param:UpdateBannerParam,
    body: UpdateBodyBanner,
  ): Promise<UpdateBannerResponse> {
    const {id}=param;
    const updatedBanner = await this.bannerModel
      .findByIdAndUpdate(id, body, { new: true })
      .exec();

    if (!updatedBanner) {
      throw new NotFoundException('Banner not found or update failed');
    }

    return {
      response_code: 200,
      response_data: 'Banner updated successfully',
    };
  }

  async delete(params: DeleteBannerParam): Promise<DeleteBannerResponse> {
    const { id } = params;
    const deletedBanner = await this.bannerModel.findByIdAndDelete(id).exec();

    if (!deletedBanner) {
      throw new NotFoundException('Banner not found or deletion failed');
    }

    return {
      response_code: 200,
      response_data: 'Banner deleted successfully',
    };
  }
}
