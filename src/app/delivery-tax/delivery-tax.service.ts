import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeliveryTaxDto } from './dto/create-deliverytax.dto';
import { UpdateDeliveryTaxDto } from './dto/update-deliverytax.dto';
import { DeliveryTax } from './schema/deliverytax.schema';

@Injectable()
export class DeliveryTaxService {
  constructor(
    @InjectModel(DeliveryTax.name) private readonly deliveryTaxModel: Model<DeliveryTax>,
  ) {}

  async create(createDeliveryTaxDto: CreateDeliveryTaxDto): Promise<DeliveryTax> {
    const newDeliveryTax = new this.deliveryTaxModel(createDeliveryTaxDto);
    return newDeliveryTax.save();
  }

  async findAll(): Promise<DeliveryTax[]> {
    return this.deliveryTaxModel.find().exec();
  }

  async findOne(id: string): Promise<DeliveryTax> {
    const deliveryTax = await this.deliveryTaxModel.findById(id).exec();
    if (!deliveryTax) {
      throw new NotFoundException(`DeliveryTax with ID ${id} not found`);
    }
    return deliveryTax;
  }

  async update(id: string, updateDeliveryTaxDto: UpdateDeliveryTaxDto): Promise<DeliveryTax> {
    const updatedDeliveryTax = await this.deliveryTaxModel
      .findByIdAndUpdate(id, updateDeliveryTaxDto, { new: true })
      .exec();

    if (!updatedDeliveryTax) {
      throw new NotFoundException(`DeliveryTax with ID ${id} not found`);
    }

    return updatedDeliveryTax;
  }

  async remove(id: string): Promise<void> {
    const result = await this.deliveryTaxModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`DeliveryTax with ID ${id} not found`);
    }
  }
}
