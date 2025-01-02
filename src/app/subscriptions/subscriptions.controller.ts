import { Controller,Get, Query } from '@nestjs/common';

@Controller('subscriptions/subscribed/users/')
export class SubscriptionsController {

    @Get('list')
    findAll(@Query('page') page:number, @Query('limit') limit : number){

    }

    @Get('subscription/list/:id')
    findOne(@Query('page') page:number, @Query('limit') limit : number){

    }
}
