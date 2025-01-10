import { Controller, Get, Post, Query, Body, HttpStatus } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationsDto } from './dto/create-notifications.dto';
import {
  AllNotificationsResponse,
  OneNotificationsResponse,
  CreateNotificationsResponse,ReadNotificationsResponse
} from './dto/response.dto';

@Controller('notifications/admin/')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('list')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<AllNotificationsResponse> {
    return await this.notificationsService.findAll(page, limit);
  }

  @Get('latest')
  async findOne():Promise<OneNotificationsResponse>{
    return await this.notificationsService.findOne();
  }

  @Post('read')
  async ReadOne(@Body() body: { notificationId: string }): Promise<
    ReadNotificationsResponse
  > {
    const notificationId = body.notificationId;
    return await this.notificationsService.ReadOne(notificationId);
  }

  @Post('send')
  async createOne(
    @Body() createNotificationsDto: CreateNotificationsDto,
  ): Promise<CreateNotificationsResponse> {
    return await this.notificationsService.createOne(createNotificationsDto);
  }
}
