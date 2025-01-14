import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto, CreateBannerResponse } from './dto/create-banner.dto';
import { UpdateBodyBanner, UpdateBannerParam, UpdateBannerResponse } from './dto/update-banner.dto';
import { DeleteBannerParam, DeleteBannerResponse } from './dto/delete-banner.dto';
import { AllBannerQuery, AllBannerResponse } from './dto/All-banner.dto';
import { OneBannerParam, OneBannerResponse } from './dto/one-banner.dto';
import { TypeBannerResponse } from './dto/type-banner.dto';
import { Roles } from '@core/decorators/roles.decorator';
import { ROLE } from '@app/users/users.model';
import { JwtAuthGuard } from '@core/guards/auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';

@Controller('banners/admin')
export class BannersController {
  constructor(private readonly bannerService: BannersService) {}

  @Get('/list')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(@Query() query: AllBannerQuery): Promise<AllBannerResponse> {
    return await this.bannerService.findAll(query);
  }

  @Get('/type/list')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findlist(): Promise<TypeBannerResponse> {
    return await this.bannerService.findlist();
  }

  @Get('/detail/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param() param: OneBannerParam): Promise<OneBannerResponse> {
    return await this.bannerService.findOne(param);
  }

  @Post('/create')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createOne(
    @Body() body: CreateBannerDto,
  ): Promise<CreateBannerResponse> {
    return await this.bannerService.createOne(body);
  }

  @Put('/update/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateOne(
    @Param() param: UpdateBannerParam,
    @Body() body: UpdateBodyBanner,
  ): Promise<UpdateBannerResponse> {
    return await this.bannerService.updateOne(param.id, body);
  }

  @Delete('/delete/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param() param: DeleteBannerParam): Promise<DeleteBannerResponse> {
    return await this.bannerService.delete(param);
  }
}
