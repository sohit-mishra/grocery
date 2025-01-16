import { Controller, Get, Post, Query, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationsBody, CreateNotificationsResponse } from './dto/create-notifications.dto';
import {
  OneNotificationsResponse,
} from './dto/one-notification.dto';
import { ReadNotificationsBody, ReadNotificationsResponse } from './dto/Read-notification.dto';
import { AllNotificationsQuery, AllNotificationsResponse } from './dto/All-notifications.dto';
import { Roles } from '@core/decorators/roles.decorator';
import { ROLE } from '@app/users/users.model';
import { JwtAuthGuard } from '@core/guards/auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';

@Controller('notifications/admin/')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('list')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async findAll(
    @Query() query: AllNotificationsQuery): Promise<AllNotificationsResponse>{
    return await this.notificationsService.findAll(query);
  }

  @Get('latest')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async findOne():Promise<OneNotificationsResponse>{
    return await this.notificationsService.findOne();
  }

  @Post('read')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async ReadOne(@Body() body: ReadNotificationsBody): Promise<
    ReadNotificationsResponse
  > {
    return await this.notificationsService.ReadOne(body);
  }

  @Post('send')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async createOne(
    @Body() createNotifications: CreateNotificationsBody,
  ): Promise<CreateNotificationsResponse> {
    return await this.notificationsService.createOne(createNotifications);
  }
}
