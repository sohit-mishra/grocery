import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders/admin/')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get('list')
    async findAll(
        @Query('q') q?: string,
        @Query('limit') limit?: number,
        @Query('page') page?: number,
        @Query('type') type?: string
    ) {
        const orders = await this.ordersService.findAll({ q, limit, page, type });
        return {
            response_code: HttpStatus.OK,
            response_data: orders.data,
            total: orders.total
        };
    }

    @Get('detail/:id')
    async findOne(@Param('id') id: string) {
        const order = await this.ordersService.findOne(id);
        return {
            response_code: HttpStatus.OK,
            response_data: order
        };
    }

    @Post('/create')
    async createOne(@Body() createOrderDto: CreateOrderDto) {
        const order = await this.ordersService.create(createOrderDto);
        return {
            response_code: HttpStatus.CREATED,
            response_data: order
        };
    }

    @Put('add-item/:id')
    async updateOne(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        const updatedOrder = await this.ordersService.update(id, updateOrderDto);
        return {
            response_code: HttpStatus.OK,
            response_data: updatedOrder
        };
    }

    @Delete('delete/:id')
    async deleteOne(@Param('id') id: string) {
        await this.ordersService.delete(id);
        return {
            response_code: HttpStatus.OK,
            response_message: 'Order deleted successfully'
        };
    }

    @Delete('/item-delete/:OrderId/:ProductId')
    async deleteItem(
        @Param('OrderId') OrderId: string,
    @Param('ProductId') ProductId: string) {
        await this.ordersService.deleteItem(OrderId, ProductId);
        return {
            response_code: HttpStatus.OK,
            response_message: 'Order item deleted successfully'
        };
    }
}
