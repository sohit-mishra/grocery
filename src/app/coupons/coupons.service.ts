import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { COUPONS_MODEL, CouponsDocument } from './coupons.model';
import { AllCouponQuery, AllCouponResponse } from './dto/All-coupon.dto';
import { OneCouponParam, OneCouponResponse } from './dto/one-coupon.dto';
import { CreateCouponDto, CreateCouponResponse } from './dto/create-coupon.dto';
import { UpdateCouponParam, UpdateCouponBody, UpdateCouponResponse } from './dto/update-coupon.dto';
import { DeleteCouponParam, DeleteCouponResponse } from './dto/delete-coupon.dto';
import { UpdateStatusCouponBody, UpdateStatusCouponParam, UpdateStatusCouponResponse } from './dto/updateStatus.coupon.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectModel(COUPONS_MODEL) private readonly couponsModel: Model<CouponsDocument>,
  ) {}

  async findAll(query: AllCouponQuery): Promise<AllCouponResponse> {
    const { page, limit, q } = query;
    const skip = (page - 1) * limit;
    const filter = q ? { couponCode: { $regex: q, $options: 'i' } } : {};

    const coupons = await this.couponsModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .exec();
    const total = await this.couponsModel.countDocuments(filter).exec();

    return {
      response_code: 200,
      response_data: coupons,
      total,
    };
  }

  async findOne(param:OneCouponParam): Promise<OneCouponResponse> {
    const coupon = await this.couponsModel.findById(param.id).select('-status -__v').exec();
    if (!coupon) {
      throw new NotFoundException(`Coupon with ID ${param.id} not found`);
    }

    return {
      response_code: 200,
      response_data: coupon,
    };
  }

  async createOne(createCouponDto: CreateCouponDto): Promise<CreateCouponResponse> {
    const coupon = new this.couponsModel(createCouponDto);
    await coupon.save();

    return {
      response_code: 200,
      response_data: 'Coupon Saved Successfully',
    };
  }

  async updateOne(param: UpdateCouponParam, updateCouponDto: UpdateCouponBody): Promise<UpdateCouponResponse> {
    const updatedCoupon = await this.couponsModel.findByIdAndUpdate(param.id, updateCouponDto, { new: true }).exec();
    if (!updatedCoupon) {
      throw new NotFoundException(`Coupon with ID ${param.id} not found`);
    }

    return {
      response_code: 200,
      response_data: 'Coupon Updated Successfully',
    };
  }

  async updateStatus(param: UpdateStatusCouponParam, status: UpdateStatusCouponBody): Promise<UpdateStatusCouponResponse> {
    const updatedCoupon = await this.couponsModel.findByIdAndUpdate(param.id, { status: status.status }, { new: true }).exec();
    if (!updatedCoupon) {
      throw new NotFoundException(`Coupon with ID ${param.id} not found`);
    }

    return {
      response_code: 200,
      response_data: 'Coupon Status Updated Successfully',
    };
  }

  async deleteOne(param: DeleteCouponParam): Promise<DeleteCouponResponse> {
    const deletedCoupon = await this.couponsModel.findByIdAndDelete(param.id).exec();
    if (!deletedCoupon) {
      throw new NotFoundException(`Coupon with ID ${param.id} not found`);
    }

    return {
      response_code: 200,
      response_data: 'Coupon Deleted Successfully',
    };
  }
}
