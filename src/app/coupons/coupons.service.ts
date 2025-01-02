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

  async findAll(page: number, limit: number, search: string) {
    const skip = (page - 1) * limit;
    const filter = search ? { title: { $regex: search, $options: 'i' } } : {};

    const coupons = await this.couponsModel.find(filter).skip(skip).limit(limit).exec();
    const total = await this.couponsModel.countDocuments(filter).exec();
    
    return { coupons, total };
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
