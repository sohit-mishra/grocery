import { Controller, Get, Post, Query, Put, Delete, Body, HttpStatus, Param } from '@nestjs/common';
import { UpdateSubscriptionsDto } from './dto/update-subscrption.dto';
import { CreateSubscriptionsDto } from './dto/create-subscription.dto';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) {}

    @Get('list')
    async findAll(@Query('page') page: number, @Query('limit') limit: number) {
        const subscriptionList = await this.subscriptionsService.findAll(page, limit);
        return {
            response_code: HttpStatus.OK,
            response_data: subscriptionList,
        };
    }

    @Get('list/:id')
    async findOne(@Param('id') id: string) {
        const subscription = await this.subscriptionsService.findOne(id);
        return {
            response_code: HttpStatus.OK,
            response_data: subscription,
        };
    }

    @Post('create')
    async createOne(@Body() createSubscriptionsDto: CreateSubscriptionsDto) {
        await this.subscriptionsService.createOne(createSubscriptionsDto);
        return {
            response_code: HttpStatus.CREATED,
            response_data: 'Subscription Created Successfully',
        };
    }

    @Put('update/:id')
    async updateOne(@Param('id') id: string, @Body() updateSubscriptionsDto: UpdateSubscriptionsDto) {
        await this.subscriptionsService.updateOne(id, updateSubscriptionsDto);
        return {
            response_code: HttpStatus.OK,
            response_data: 'Subscription Updated Successfully',
        };
    }

    @Delete('delete/:id')
    async deleteOne(@Param('id') id: string) {
        await this.subscriptionsService.deleteOne(id);
        return {
            response_code: HttpStatus.OK,
            response_data: 'Subscription Deleted Successfully',
        };
    }
}
