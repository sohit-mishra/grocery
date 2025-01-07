import { Controller, Get, Post, Put, Body, Param, HttpStatus } from '@nestjs/common';
import { CreateDeliveryTimeSlotDto } from './dto/create-delivery-time-slots.dto';
import { UpdateDeliveryTimeSlotDto } from './dto/update-delivery-time-slots.dto';
import { DeliverytimeslotsService } from './deliverytimeslots.service';

@Controller('deliverytimeslots')
export class DeliverytimeslotsController {
  
  constructor(private readonly deliveryTimeslotService: DeliverytimeslotsService) {}

  @Get()
  async findAll() {
    return await this.deliveryTimeslotService.findAll();
  }

  @Post('create')
  async create(@Body() createDeliveryTimeSlotDto: CreateDeliveryTimeSlotDto) {
    const createdTimeSlot = await this.deliveryTimeslotService.create(createDeliveryTimeSlotDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Delivery time slot created successfully',
    };
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateDeliveryTimeSlotDto: UpdateDeliveryTimeSlotDto) {
    const updatedTimeSlot = await this.deliveryTimeslotService.update(id, updateDeliveryTimeSlotDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delivery time slot updated successfully',
    };
  }
}
