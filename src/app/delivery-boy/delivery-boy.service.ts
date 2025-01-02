import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeliveryBoy } from './schema/delivery-boy.schema';
import { CreateDeliveryBoyDto } from './dto/create-delivery-boy.dto';
import { UpdateDeliveryBoyDto } from './dto/update-delivery-boy.dto';

@Injectable()
export class DeliveryBoyService {
  constructor(
    @InjectModel(DeliveryBoy.name) private readonly deliveryBoyModel: Model<DeliveryBoy>,
  ) {}

  async findAll(page: number, limit: number, search: string) {
    const skip = (page - 1) * limit;
    const filter = search ? { $or: [{ firstName: { $regex: search, $options: 'i' } }, { lastName: { $regex: search, $options: 'i' } }] } : {};
    const total = await this.deliveryBoyModel.countDocuments(filter).exec();
    const deliveryBoys = await this.deliveryBoyModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();
    return { data: deliveryBoys, total };
  }

  async findOne(id: string) {
    const deliveryBoy = await this.deliveryBoyModel.findById(id).exec();
    if (!deliveryBoy) {
      throw new NotFoundException(`Delivery boy with ID ${id} not found`);
    }
    return deliveryBoy;
  }

  async createOne(createDeliveryBoyDto: CreateDeliveryBoyDto) {
    const createdDeliveryBoy = new this.deliveryBoyModel(createDeliveryBoyDto);
    return createdDeliveryBoy.save();
  }

  async updateOne(id: string, updateDeliveryBoyDto: UpdateDeliveryBoyDto) {
    const updatedDeliveryBoy = await this.deliveryBoyModel
      .findByIdAndUpdate(id, updateDeliveryBoyDto, { new: true })
      .exec();
    if (!updatedDeliveryBoy) {
      throw new NotFoundException(`Delivery boy with ID ${id} not found`);
    }
    return updatedDeliveryBoy;
  }
}
