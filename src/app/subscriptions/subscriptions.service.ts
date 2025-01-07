import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Subscription } from './schema/subscriptions.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSubscriptionsDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionsDto } from './dto/update-subscrption.dto';

@Injectable()
export class SubscriptionsService {
    constructor(@InjectModel(Subscription.name) private readonly subscriptionsModel: Model<Subscription>) {}

    async findAll(page: number, limit: number): Promise<Subscription[]> {
        const skip = (page - 1) * limit;
        return this.subscriptionsModel.find().skip(skip).limit(limit).exec();
    }

    async findOne(id: string): Promise<Subscription | null> {
        return this.subscriptionsModel.findById(id).exec();
    }

    async createOne(createSubscriptionsDto: CreateSubscriptionsDto): Promise<Subscription> {
        const newSubscription = new this.subscriptionsModel(createSubscriptionsDto);
        return newSubscription.save();
    }

    async updateOne(id: string, updateSubscriptionsDto: UpdateSubscriptionsDto): Promise<Subscription | null> {
        return this.subscriptionsModel.findByIdAndUpdate(id, updateSubscriptionsDto, { new: true }).exec();
    }

    async deleteOne(id: string): Promise<Subscription | null> {
        return this.subscriptionsModel.findByIdAndDelete(id).exec();
    }
}
