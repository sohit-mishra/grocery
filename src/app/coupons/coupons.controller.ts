import { Controller, Get, Post, Patch, Delete, Param, Body, Query, NotFoundException, HttpStatus } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupons/admin')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get('/list')
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('q') search: string = '',
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    const result = await this.couponsService.findAll(pageNumber, limitNumber, search); 

    return {
      response_code: HttpStatus.OK,
      response_data: result.coupons,
      total: result.total,
    };
  }

  @Post('/create')
  async createOne(@Body() createCouponDto: CreateCouponDto) {
    const coupon = await this.couponsService.createOne(createCouponDto);
    return {
      response_code: HttpStatus.CREATED,
      response_data: 'Coupon saved successfully',
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
      response_code: HttpStatus.OK,
      response_data: 'Coupon updated successfully',
    };
  }

  @Delete('/delete/:id')
  async deleteOne(@Param('id') id: string) {
    await this.couponsService.deleteOne(id);
    return {
      response_code: HttpStatus.OK,
      response_data: 'Coupon deleted successfully',
    };
  }
}
