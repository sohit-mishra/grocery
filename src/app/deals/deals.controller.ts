import { Controller, Delete, Get, Put, Post, Param, Body, Query, HttpStatus } from '@nestjs/common';
import { CreateDealsDto } from './dto/create-deals.dto';
import { UpdateDealsDto } from './dto/update-deals.dto';
import { DealsService } from './deals.service';

@Controller('deals/admin')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get('list')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('q') search: string = '',
  ) {
    const deals = await this.dealsService.findAll({ page, limit, search });
    return {
      response_code: HttpStatus.OK,
      response_data: deals.deals,
      total:deals.total
    };
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: string) {
    const deal = await this.dealsService.findOne(id);
    return {
      response_code: HttpStatus.OK,
      response_data: deal,
    };
  }

  @Post('create')
  async createOne(@Body() createDealsDto: CreateDealsDto) {
    await this.dealsService.createOne(createDealsDto);
    return {
      response_code: HttpStatus.CREATED,
      response_data: 'Deal created successfully',
    };
  }

  @Put('update/:id')
  async updateOne(@Param('id') id: string, @Body() updateDealsDto: UpdateDealsDto) {
    const updatedDeal = await this.dealsService.updateOne(id, updateDealsDto);
    return {
      response_code: HttpStatus.OK,
      response_data: 'Deal updated successfully',
    };
  }

  @Delete('delete/:id')
  async deleteOne(@Param('id') id: string) {
    await this.dealsService.deleteOne(id);
    return {
      response_code: HttpStatus.OK,
      response_data: 'Deal Deleted successfully',
    };
  }
}
