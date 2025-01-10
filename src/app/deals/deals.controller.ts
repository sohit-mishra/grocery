import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  Param,
  Body,
  Query
} from '@nestjs/common';
import { CreateDealsDto } from './dto/create-deals.dto';
import { UpdateDealsDto } from './dto/update-deals.dto';
import { DealsService } from './deals.service';
import {
  AllDealsResponse,
  OneDealsResponse,
  CreateDealsResponse,
  TypeDealsResponse,
  StatusUpdateDealsResponse,
  UpdateDealsResponse,
  DeleteDealsResponse,
} from './dto/response.dto';

@Controller('deals/admin/')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get('list')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('q') search: string = '',
  ): Promise<AllDealsResponse> {
    return await this.dealsService.findAll({ page, limit, search });
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: string): Promise<OneDealsResponse> {
    return await this.dealsService.findOne(id);
  }

  @Get('type/list')
  async findlist(): Promise<TypeDealsResponse> {
    return await this.dealsService.findlist();
  }

  @Post('create')
  async createOne(@Body() createDealsDto: CreateDealsDto):Promise<CreateDealsResponse> {
    return await this.dealsService.createOne(createDealsDto);
  }

  @Put('update/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateDealsDto: UpdateDealsDto,
  ):Promise<UpdateDealsResponse> {
    return await this.dealsService.updateOne(id, updateDealsDto);
  }

  @Put('/status-update/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() statusDto: { status: boolean },
  ):Promise<StatusUpdateDealsResponse> {
    const { status } = statusDto;
    return await this.dealsService.updateStatus(id, status);
  }

  @Delete('delete/:id')
  async deleteOne(@Param('id') id: string):Promise<DeleteDealsResponse> {
    return await this.dealsService.deleteOne(id);
  }
}
