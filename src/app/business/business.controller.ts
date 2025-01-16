import { Body, Controller, Get, Put,Post, UseGuards } from '@nestjs/common';
import { UpdateBodyBusiness, UpdateBussinessResponse } from './dto/update-business.dto';
import { BusinessService } from './business.service';
import { AllBusinessResponse } from './dto/AllBusiness.dto';
import { Roles } from '@core/decorators/roles.decorator';
import { ROLE } from '@app/users/users.model';
import { JwtAuthGuard } from '@core/guards/auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { CreateBodyBusiness, CreateBusinessResponse } from './dto/create-business.dto';

@Controller('business/admin')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('detail')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async findAll(): Promise<AllBusinessResponse> {
    return this.businessService.findAll();
  }

  @Post('create')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async CreateOne(
    @Body() create: CreateBodyBusiness,
  ): Promise<
  CreateBusinessResponse> {
    return this.businessService.CreateOne(create);
  }

  @Put('update')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async updateOne(
    @Body() update: UpdateBodyBusiness,
  ): Promise<UpdateBussinessResponse> {
    return this.businessService.updateOne(update);
  }
}
