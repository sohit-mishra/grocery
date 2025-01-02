import { Controller, Get, Post, Query, Body, HttpStatus } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationsDto } from './dto/create-notifications.dto';

@Controller('notifications/admin/')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('list')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const notifications = await this.notificationsService.findAll(page, limit);
    return {
      response_code: HttpStatus.OK,
      response_data: notifications.data,
      total: notifications.total
    };
  }

  @Post('read')
  async findOne(@Body() body: { notificationId: string }) {
    const notificationId = body.notificationId;
    const notification = await this.notificationsService.findOne(notificationId);
    return {
      response_code: HttpStatus.OK,
      response_data: notification,
    };
  }

  @Post('send')
  async createOne(@Body() createNotificationsDto: CreateNotificationsDto) {
    const notification = await this.notificationsService.createOne(createNotificationsDto);
    return {
      response_code: HttpStatus.CREATED,
      response_data: 'Push notification sent successfully',
    };
  }
}
