import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupons } from './schema/coupons.schema';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectModel(Coupons.name) private readonly couponsModel: Model<Coupons>,
  ) {}

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const coupons = await this.couponsModel.find().skip(skip).limit(limit).exec();
    const total = await this.couponsModel.countDocuments().exec();
    return { data: coupons, total };
  }

  async findOne(id: string) {
    const coupon = await this.couponsModel.findById(id).exec();
    if (!coupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }
    return coupon;
  }

  async createOne(createCouponDto: CreateCouponDto) {
    const coupon = new this.couponsModel(createCouponDto);
    return await coupon.save();
  }

  async updateOne(id: string, updateCouponDto: UpdateCouponDto) {
    const updatedCoupon = await this.couponsModel
      .findByIdAndUpdate(id, updateCouponDto, { new: true })
      .exec();
    if (!updatedCoupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }
    return updatedCoupon;
  }

  async deleteOne(id: string) {
    const deletedCoupon = await this.couponsModel.findByIdAndDelete(id).exec();
    if (!deletedCoupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }
  }
}
