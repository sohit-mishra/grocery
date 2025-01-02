import { Controller, Put, Get, Post, Query, Param, Body } from '@nestjs/common';
import { CreateDeliveryBoyDto } from './dto/create-delivery-boy.dto';
import { UpdateDeliveryBoyDto } from './dto/update-delivery-boy.dto';
import { DeliveryBoyService } from './delivery-boy.service';

@Controller('delivery-boy')
export class DeliveryBoyController {
  constructor(private readonly deliveryBoyService: DeliveryBoyService) {}

  @Get('list')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('q') search: string = '',
  ) {
    const result = await this.deliveryBoyService.findAll(page, limit, search);
    return {
      response_code: 200,
      response_data: result.data,
      total: result.total,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const deliveryBoy = await this.deliveryBoyService.findOne(id);
    return {
      response_code: 200,
      response_data: deliveryBoy,
    };
  }

  @Post()
  async createOne(@Body() createDeliveryBoyDto: CreateDeliveryBoyDto) {
    const newDeliveryBoy = await this.deliveryBoyService.createOne(createDeliveryBoyDto);
    return {
      response_code: 201,
      response_data: 'Delivery Boy created successfully',
    };
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateDeliveryBoyDto: UpdateDeliveryBoyDto,
  ) {
    const updatedDeliveryBoy = await this.deliveryBoyService.updateOne(id, updateDeliveryBoyDto);
    return {
      response_code: 200,
      response_data: 'Delivery Boy updated successfully',
    };
  }
}
