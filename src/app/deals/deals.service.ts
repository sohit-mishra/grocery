import { Injectable } from '@nestjs/common';
import { CreateDealsDto } from './dto/create-deals.dto';
import { Model } from 'mongoose';
import { UpdateDealsDto } from './dto/update-deals.dto';
import { Deals } from './schema/deals.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DealsService {
  constructor(@InjectModel(Deals.name) private readonly dealsModel: Model<Deals>) {}

  async findAll({ page, limit, search }: { page: number; limit: number; search: string }) {
    const skip = (page - 1) * limit;
    const filter = search ? { title: { $regex: search, $options: 'i' } } : {};
    
    const total = await this.dealsModel.countDocuments(filter).exec();
    
    const deals = await this.dealsModel.find(filter).skip(skip).limit(limit).exec();
    
    return {
      total,
      deals,
    };
  }
  

  async findOne(id: string) {
    return await this.dealsModel.findById(id).exec();
  }

  async createOne(createDealsDto: CreateDealsDto) {
    const newDeal = new this.dealsModel(createDealsDto);
    return await newDeal.save();
  }

  async updateOne(id: string, updateDealsDto: UpdateDealsDto) {
    return await this.dealsModel.findByIdAndUpdate(id, updateDealsDto, { new: true }).exec();
  }

  async deleteOne(id: string) {
    return await this.dealsModel.findByIdAndDelete(id).exec();
  }
}
