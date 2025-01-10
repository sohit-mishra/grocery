import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupons } from './schema/coupons.schema';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import {
  AllCouponResponse,
  OneCouponResponse,
  CreateCouponResponse,
  UpdateCouponResponse,
  UpdateStatusCouponResponse,
  DeleteCouponResponse,
} from './dto/response.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectModel(Coupons.name) private readonly couponsModel: Model<Coupons>,
  ) {}

  async findAll(
    page: number,
    limit: number,
    search: string,
  ): Promise<AllCouponResponse> {
    const skip = (page - 1) * limit;
    const filter = search ? { couponCode: { $regex: search, $options: 'i' } } : {};

    const coupons = await this.couponsModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .exec();
    const total = await this.couponsModel.countDocuments(filter).exec();

    const response: AllCouponResponse = {
      response_code: 200,
      response_data: coupons,
      total,
    };

    return response;
  }

  async findOne(id: string): Promise<OneCouponResponse> {
    const coupon = await this.couponsModel.findById(id).select('-status -__v').exec();
    if (!coupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }

    const response: OneCouponResponse = {
      response_code: 200,
      response_data: coupon,
    };

    return response;
  }

  async createOne(
    createCouponDto: CreateCouponDto,
  ): Promise<CreateCouponResponse> {
    const coupon = new this.couponsModel(createCouponDto);
    await coupon.save();

    const response: CreateCouponResponse = {
      response_code: 200,
      response_data: 'Coupon Saved Sucessfully',
    };

    return response;
  }

  async updateOne(
    id: string,
    updateCouponDto: UpdateCouponDto,
  ): Promise<UpdateCouponResponse> {
    const updatedCoupon = await this.couponsModel
      .findByIdAndUpdate(id, updateCouponDto, { new: true })
      .exec();
    if (!updatedCoupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }

    const response: UpdateCouponResponse = {
      response_code: 200,
      response_data: 'Coupon Update Sucessfully',
    };

    return response;
  }

  async updateStatus(
    id: string,
    status: boolean,
  ): Promise<UpdateStatusCouponResponse> {
    const updatedCoupon = await this.couponsModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();

    if (!updatedCoupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }

    const response: UpdateStatusCouponResponse = {
      response_code: 200,
      response_data: 'Coupon Update Successfully',
    };

    return response;
  }

  async deleteOne(id: string): Promise<DeleteCouponResponse> {
    const deletedCoupon = await this.couponsModel.findByIdAndDelete(id).exec();
    if (!deletedCoupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }

    const response: DeleteCouponResponse = {
      response_code: 200,
      response_data: 'Coupon Delete Successfully',
    };

    return response;
  }
}
