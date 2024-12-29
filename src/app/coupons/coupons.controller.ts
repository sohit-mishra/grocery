import { Controller, Get, Post, Patch, Delete, Param, Body, Query, NotFoundException } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupons/admin/')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get('/list')
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const result = await this.couponsService.findAll(pageNumber, limitNumber); // 
    return {
      status: 'success',
      message: 'Coupons retrieved successfully',
      total: result.total,
      data: result.data,
    };
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: string) {
    const coupon = await this.couponsService.findOne(id); 
    if (!coupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }
    return {
      status: 'success',
      message: 'Coupon retrieved successfully',
      data: coupon,
    };
  }

  @Post('/create')
  async createOne(@Body() createCouponDto: CreateCouponDto) {
    const coupon = await this.couponsService.createOne(createCouponDto); // 
    return {
      response_code: 200,
      response_data: 'Coupon saved successfully',
      data: coupon,
    };
  }

  @Patch('/update/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    const updatedCoupon = await this.couponsService.updateOne(
      id,
      updateCouponDto,
    ); 
    if (!updatedCoupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }
    return {
      status: 'success',
      message: 'Coupon updated successfully',
      data: updatedCoupon,
    };
  }

  @Delete('/delete/:id')
  async deleteOne(@Param('id') id: string) {
    await this.couponsService.deleteOne(id);
    return {
      status: 'success',
      message: `Coupon with ID ${id} deleted successfully`,
    };
  }
}
