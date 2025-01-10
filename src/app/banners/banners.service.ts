import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Banner } from './schema/banner.schema';
import { Model } from 'mongoose';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import {
  AllBannerResponse,
  TypeBannerResponse,
  OneBannerResponse,
  CreateBannerResponse,
  UpdateBannerResponse,
  DeleteBannerResponse,
} from './dto/response.dto';

@Injectable()
export class BannersService {
  constructor(
    @InjectModel(Banner.name) private readonly bannerModel: Model<Banner>,
  ) {}

  async findAll(page: number = 1, limit: number = 10, search: string = '') {
    const skip = (page - 1) * limit;
    const query = search ? { title: { $regex: search, $options: 'i' } } : {};
    const banners = await this.bannerModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.bannerModel.countDocuments(query).exec();

    const response: AllBannerResponse = {
      response_code: 200,
      response_data: banners,
      total: total,
    };

    return response;
  }

  async findOne(id: string) {
    const banner = await this.bannerModel.findById(id).exec();
    if (!banner) {
      throw new NotFoundException('Banner not found');
    }

    const response: OneBannerResponse = {
      response_code: 200,
      response_data: banner,
    };

    return response;
  }

  async findlist(): Promise<TypeBannerResponse> {
    const data ={
      CATEGORY: 'CATEGORY',
      PRODUCT: 'PRODUCT',
    }; 
    const response: TypeBannerResponse = {
      response_code: 200,
      response_data: data,
    };
    return response;
  }

  async createOne(body: CreateBannerDto): Promise<CreateBannerResponse> {
    const newBanner = new this.bannerModel(body);
    await newBanner.save();

    const response: CreateBannerResponse = {
      response_code: 200,
      response_data: 'Banner saved successfully',
    };

    return response;
  }

  async updateOne(
    id: string,
    body: UpdateBannerDto,
  ): Promise<UpdateBannerResponse> {
    const updatedBanner = await this.bannerModel
      .findByIdAndUpdate(id, body, { new: true })
      .exec();

    if (!updatedBanner) {
      throw new NotFoundException('Banner not found or update failed');
    }

    const response: UpdateBannerResponse = {
      response_code: 200,
      response_data: 'Banner updated successfully',
    };

    return response;
  }

  async delete(id: string) {
    const deletedBanner = await this.bannerModel.findByIdAndDelete(id).exec();
    if (!deletedBanner) {
      throw new NotFoundException('Banner not found or deletion failed');
    }
    const response: DeleteBannerResponse = {
      response_code: 200,
      response_data: 'Banner deleted successfully',
    };

    return response;
  }
}
