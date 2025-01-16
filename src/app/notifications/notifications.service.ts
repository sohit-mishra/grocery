import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notifications } from './notifications.model';
import { CreateNotificationsBody, CreateNotificationsResponse } from './dto/create-notifications.dto';
import {
  OneNotificationsResponse
} from './dto/one-notification.dto';
import { AllNotificationsQuery, AllNotificationsResponse } from './dto/All-notifications.dto';
import { ReadNotificationsBody, ReadNotificationsResponse } from './dto/Read-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notifications.name)
    private readonly notificationsModel: Model<Notifications>,
  ) {}

  async findAll(query:AllNotificationsQuery): Promise<AllNotificationsResponse> {
    const {page, limit} = query;
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

  async ReadOne(param: ReadNotificationsBody): Promise<ReadNotificationsResponse> {
    const { notificationId }= param;
    const notification = await this.notificationsModel
      .findByIdAndUpdate(notificationId, { isRead: true }, { new: true })
      .exec();
  
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${notificationId} not found`);
    }
  
    const response: ReadNotificationsResponse = {
      response_code: 200,
      response_data: { status: true },
    };
    return response;
  }
  

  async createOne(createNotificationsDto: CreateNotificationsBody): Promise<CreateNotificationsResponse> {
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
