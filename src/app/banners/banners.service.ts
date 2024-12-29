import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Banner } from './schema/banner.schema';
import { Model } from 'mongoose';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannersService {
  constructor(
    @InjectModel(Banner.name) private readonly bannerModel: Model<Banner>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const banners = await this.bannerModel.find().skip(skip).limit(limit).exec();
    const total = await this.bannerModel.countDocuments().exec();

    return {
      data: banners,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string) {
    const banner = await this.bannerModel.findById(id).exec();
    if (!banner) {
      throw new NotFoundException('Banner not found');
    }
    return banner;
  }

  async createOne(createBannerDto: CreateBannerDto) {
    const newBanner = new this.bannerModel(createBannerDto);
    return await newBanner.save();
  }

  async updateOne(id: string, updateBannerDto: UpdateBannerDto) {
    const updatedBanner = await this.bannerModel
      .findByIdAndUpdate(id, updateBannerDto, { new: true })
      .exec();
    if (!updatedBanner) {
      throw new NotFoundException('Banner not found or update failed');
    }
    return updatedBanner;
  }

  async delete(id: string) {
    const deletedBanner = await this.bannerModel.findByIdAndDelete(id).exec();
    if (!deletedBanner) {
      throw new NotFoundException('Banner not found or deletion failed');
    }
    return deletedBanner;
  }
}
