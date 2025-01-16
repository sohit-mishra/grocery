import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Business, BusinessDocument } from './business.model';
import { Model } from 'mongoose';
import { UpdateBodyBusiness, UpdateBussinessResponse } from './dto/update-business.dto';
import { AllBusinessResponse } from './dto/AllBusiness.dto';
import { CreateBodyBusiness, CreateBusinessResponse } from './dto/create-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name) private readonly businessModel: Model<BusinessDocument>,
  ) {}

  async findAll(): Promise<AllBusinessResponse> {
    const data = await this.businessModel.find().exec();
    const total = await this.businessModel.countDocuments().exec();

    return {
      response_code: 200,
      response_data: data,
      total: total,
    };
  }

  async CreateOne(body: CreateBodyBusiness): Promise<CreateBusinessResponse> {
    const newBusiness = new this.businessModel(body);
    await newBusiness.save();

    return {
      response_code: 200,
      response_data: 'Business saved successfully',
    };
  }

  async updateOne(update: UpdateBodyBusiness): Promise<UpdateBussinessResponse> {
    const { email, ...updateFields } = update;

    const updatedBusiness = await this.businessModel
      .findOneAndUpdate(
        { email },
        { $set: updateFields },
        { new: true },
      )
      .exec();

    if (!updatedBusiness) {
      throw new HttpException('Business not found or unable to update', HttpStatus.NOT_FOUND);
    }

    return {
      response_code: 200,
      response_data: 'Business updated successfully',
    };
  }
}
