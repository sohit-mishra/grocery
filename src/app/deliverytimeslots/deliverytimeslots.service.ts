import { Injectable } from '@nestjs/common';
import { CreateDeliveryTimeSlotDto } from './dto/create-delivery-time-slots.dto';
import { UpdateDeliveryTimeSlotDto } from './dto/update-delivery-time-slots.dto';
import { DeliveryTimeSlot } from './schema/delivery-time-slots.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DeliverytimeslotsService {
    constructor(
        @InjectModel(DeliveryTimeSlot.name) 
        private readonly deliveryTimeSlotModel: Model<DeliveryTimeSlot>
    ) {}

    async findAll(): Promise<DeliveryTimeSlot[]> {
        return this.deliveryTimeSlotModel.find().exec();
    }

    async create(createDeliveryTimeSlotDto: CreateDeliveryTimeSlotDto): Promise<DeliveryTimeSlot> {
        const createdDeliveryTimeSlot = new this.deliveryTimeSlotModel(createDeliveryTimeSlotDto);
        return createdDeliveryTimeSlot.save();
    }

    async update(id: string, updateDeliveryTimeSlotDto: UpdateDeliveryTimeSlotDto): Promise<DeliveryTimeSlot> {
        return this.deliveryTimeSlotModel.findByIdAndUpdate(id, updateDeliveryTimeSlotDto, { new: true }).exec();
    }
}
