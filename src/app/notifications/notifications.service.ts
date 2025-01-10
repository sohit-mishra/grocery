import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notifications } from './schema/notifications.schema';
import { CreateNotificationsDto } from './dto/create-notifications.dto';
import {
  AllNotificationsResponse,
  OneNotificationsResponse,
  CreateNotificationsResponse,
  ReadNotificationsResponse
} from './dto/response.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notifications.name)
    private readonly notificationsModel: Model<Notifications>,
  ) {}

  async findAll(page: number = 1, limit: number = 10): Promise<AllNotificationsResponse> {
    const skip = (page - 1) * limit;
    const notifications = await this.notificationsModel
      .find()
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .exec();
    const total = await this.notificationsModel.countDocuments().exec();

    const response: AllNotificationsResponse = {
      response_code: 200,
      response_data: notifications,
      total,
    };
    return response;
  }

  async findOne(): Promise<OneNotificationsResponse> {
    const notification = await this.notificationsModel.find().select('-__v').exec();
    const total = await this.notificationsModel.countDocuments().exec();

    const response: OneNotificationsResponse = {
      response_code: 200,
      response_data: notification,
      total
    };
    return response;
  }

  async ReadOne(id: string): Promise<ReadNotificationsResponse> {
    const notification = await this.notificationsModel
      .findByIdAndUpdate(id, { isRead: true }, { new: true })
      .exec();
  
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
  
    const response: ReadNotificationsResponse = {
      response_code: 200,
      response_data: { status: true },
    };
    return response;
  }
  

  async createOne(createNotificationsDto: CreateNotificationsDto): Promise<CreateNotificationsResponse> {
    const { title, body } = createNotificationsDto;
  
    const newNotification = new this.notificationsModel({
      title,
      description: body,
      notifyType: "PUSH_NOTIFICATION_BY_ADMIN",
    });
  
    await newNotification.save();
  
    const response: CreateNotificationsResponse = {
      response_code: 200,
      response_data: "Push notification sent successfully",
    };
  
    return response;
  }
  
  
}
