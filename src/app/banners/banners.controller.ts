import { Controller, Delete, Get, Put, Post, Param, Body, Query } from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Controller('banners/admin')
export class BannersController {
  constructor(private readonly bannerService: BannersService) {}

  @Get('/list')
  async findAll(@Query('page') page: number, @Query('limit') limit:number) {
    const banners = await this.bannerService.findAll(page, limit);
    return {
      response_code: 200,
      response_data: banners,
    };
  }

  @Get('/details/:id')
  async findOne(@Param('id') id: string) {
    const banner = await this.bannerService.findOne(id);
    if (!banner) {
      return {
        response_code: 404,
        response_data: 'Banner not found',
      };
    }
    return {
      response_code: 200,
      response_data: banner,
    };
  }

  @Post('/create')
  async createOne(@Body() createBannerDto: CreateBannerDto) {
    const banner = await this.bannerService.createOne(createBannerDto);
    return {
      response_code: 201,
      response_data: 'Banner created successfully',
      data: banner,
    };
  }

  @Put('/update/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    const updatedBanner = await this.bannerService.updateOne(id, updateBannerDto);
    if (!updatedBanner) {
      return {
        response_code: 404,
        response_data: 'Banner not found or update failed',
      };
    }
    return {
      response_code: 200,
      response_data: 'Banner updated successfully',
    };
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    const deletedBanner = await this.bannerService.delete(id);
    if (!deletedBanner) {
      return {
        response_code: 404,
        response_data: 'Banner not found or deletion failed',
      };
    }
    return {
      response_code: 200,
      response_data: 'Banner deleted successfully',
    };
  }
}
