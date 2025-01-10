import { Controller, Delete, Get, Put, Post, Param, Body, Query } from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import {
  AllBannerResponse,
  TypeBannerResponse,
  OneBannerResponse,
  CreateBannerResponse,
  UpdateBannerResponse,
  DeleteBannerResponse,
} from './dto/response.dto';

@Controller('banners/admin')
export class BannersController {
  constructor(private readonly bannerService: BannersService) {}

  @Get('/list')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('q') search: string = '',
  ): Promise<AllBannerResponse> {
    return await this.bannerService.findAll(page, limit, search);
  }

  @Get('/type/list')
  async findlist(): Promise<TypeBannerResponse> {
    return await this.bannerService.findlist();
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: string): Promise<OneBannerResponse> {
    return await this.bannerService.findOne(id);
  }

  @Post('/create')
  async createOne(@Body() body: CreateBannerDto): Promise<CreateBannerResponse> {
    return await this.bannerService.createOne(body);
  }

  @Put('/update/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateBannerDto,
  ): Promise<UpdateBannerResponse> {
    return await this.bannerService.updateOne(id, body);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<DeleteBannerResponse> {
    return await this.bannerService.delete(id);
  }
}
