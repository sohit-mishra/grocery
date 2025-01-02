import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notifications } from './schema/notifications.schema';
import { CreateNotificationsDto } from './dto/create-notifications.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notifications.name)
    private readonly notificationsModel: Model<Notifications>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const notifications = await this.notificationsModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.notificationsModel.countDocuments().exec();
    return { data: notifications, total };
  }

  async findOne(id: string) {
    const notification = await this.notificationsModel
      .findByIdAndUpdate(id, { status: true }, { new: true }).exec();

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return { status: true};
  }

  async createOne(createNotificationsDto: CreateNotificationsDto) {
    const newNotification = new this.notificationsModel(createNotificationsDto);
    return await newNotification.save();
  }
}
