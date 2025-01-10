import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Put,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import {
  AllCouponResponse,
  OneCouponResponse,
  CreateCouponResponse,
  UpdateCouponResponse,
  UpdateStatusCouponResponse,
  DeleteCouponResponse,
} from './dto/response.dto';

@Controller('coupons/admin')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get('/list')
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('q') search: string = '',
  ): Promise<AllCouponResponse> {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    return await this.couponsService.findAll(pageNumber, limitNumber, search);
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: string): Promise<OneCouponResponse> {
    return await this.couponsService.findOne(id);
  }

  @Post('/create')
  async createOne(
    @Body() createCouponDto: CreateCouponDto,
  ): Promise<CreateCouponResponse> {
    return await this.couponsService.createOne(createCouponDto);
  }

  @Put('/update/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ): Promise<UpdateCouponResponse> {
    return await this.couponsService.updateOne(id, updateCouponDto);
  }

  @Put('status-update/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() statusDto: { status: boolean },
  ): Promise<UpdateStatusCouponResponse> {
    const { status } = statusDto;

    return await this.couponsService.updateStatus(id, status);
  }

  @Delete('/delete/:id')
  async deleteOne(@Param('id') id: string): Promise<DeleteCouponResponse> {
    return await this.couponsService.deleteOne(id);
  }
}
