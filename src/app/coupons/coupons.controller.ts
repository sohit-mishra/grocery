import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { AllCouponQuery, AllCouponResponse } from './dto/All-coupon.dto';
import { CreateCouponDto, CreateCouponResponse } from './dto/create-coupon.dto';
import { UpdateCouponParam, UpdateCouponBody, UpdateCouponResponse } from './dto/update-coupon.dto';
import { UpdateStatusCouponBody, UpdateStatusCouponParam, UpdateStatusCouponResponse } from './dto/updateStatus.coupon.dto';
import { DeleteCouponParam, DeleteCouponResponse } from './dto/delete-coupon.dto';
import { OneCouponResponse, OneCouponParam } from './dto/one-coupon.dto';
import { Roles } from '@core/decorators/roles.decorator';
import { ROLE } from '@app/users/users.model';
import { JwtAuthGuard } from '@core/guards/auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';


@Controller('coupons/admin')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get('/list')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async findAll(@Query() query: AllCouponQuery): Promise<AllCouponResponse> {
    return await this.couponsService.findAll(query);
  }

  @Get('/detail/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async findOne(@Param() param: OneCouponParam): Promise<OneCouponResponse> {
    return await this.couponsService.findOne(param);
  }

  @Post('/create')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async create(@Body() createCouponDto: CreateCouponDto): Promise<CreateCouponResponse> {
    return await this.couponsService.createOne(createCouponDto);
  }

  @Put('/update/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async update(@Param() param: UpdateCouponParam, @Body() update: UpdateCouponBody): Promise<UpdateCouponResponse> {
    return await this.couponsService.updateOne(param, update);
  }

  @Put('/update-status/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async updateStatus(@Param() param: UpdateStatusCouponParam, @Body() statusDto: UpdateStatusCouponBody): Promise<UpdateStatusCouponResponse> {
    return await this.couponsService.updateStatus(param, statusDto);
  }

  @Delete('/delete/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async delete(@Param() param: DeleteCouponParam): Promise<DeleteCouponResponse> {
    return await this.couponsService.deleteOne(param);
  }
}
