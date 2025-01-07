import { Controller, Get, Post, Put, Delete, HttpStatus, Body, Param } from '@nestjs/common';
import { CreateDeliveryTaxDto } from './dto/create-deliverytax.dto';
import { UpdateDeliveryTaxDto } from './dto/update-deliverytax.dto';

@Controller('settings/admin/delivery-tax')
export class DeliveryTaxController {

  @Get()
  findAll() {
    return {
      response_code: HttpStatus.OK,
      response_data: "Fetched all delivery tax settings successfully",
    };
  }

  @Post('create')
  create(@Body() createDeliveryTaxDto: CreateDeliveryTaxDto) {
    return {
      response_code: HttpStatus.CREATED,
      response_data: "Delivery tax settings created successfully",
    };
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateDeliveryTaxDto: UpdateDeliveryTaxDto) {
    return {
      response_code: HttpStatus.OK,
      response_data: "Delivery tax settings updated successfully",
    };
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return {
      response_code: HttpStatus.OK,
      response_data: `Delivery tax setting with ID ${id} deleted successfully`,
    };
  }
}
