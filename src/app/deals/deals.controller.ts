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
import {
  CreateDealsDto,
  CreateDealsResponse,
} from './dto/create-deals.dto';
import {
  UpdateDealParam,
  UpdateBodyDeals,
  UpdateDealsResponse,
} from './dto/update-deals.dto';
import {
  DeleteDealsParam,
  DeleteDealsResponse,
} from './dto/delete-deals.dto';
import {  AllDealsQuery,
  AllDealsResponse,
} from './dto/All-deals.dto';
import {
  OneDealsParam,
  OneDealsResponse,
} from './dto/One-deals.dto';
import { TypeDealsResponse } from './dto/Type-deals.dto';
import {
  StatusUpdateDealsBody,
  StatusUpdateDealsParam,
  StatusUpdateDealsResponse,
} from './dto/UpdateStatus-deals.dto';
import { Roles } from '@core/decorators/roles.decorator';
import { ROLE } from '@app/users/users.model';
import { JwtAuthGuard } from '@core/guards/auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { DealsService } from './deals.service';

@Controller('deals/admin')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get('list')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(@Query() query: AllDealsQuery): Promise<AllDealsResponse> {
    return await this.dealsService.findAll(query);
  }

  @Get('detail/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param() param: OneDealsParam): Promise<OneDealsResponse> {
    return await this.dealsService.findOne(param);
  }

  @Get('type/list')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findList(): Promise<TypeDealsResponse> {
    return await this.dealsService.findList();
  }

  @Post('create')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createOne(@Body() createDealsDto: CreateDealsDto): Promise<CreateDealsResponse> {
    return await this.dealsService.createOne(createDealsDto);
  }

  @Put('update/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateOne(
    @Param() param: UpdateDealParam,
    @Body() update: UpdateBodyDeals,
  ): Promise<UpdateDealsResponse> {
    return await this.dealsService.updateOne(param, update);
  }

  @Put('status-update/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateStatus(
    @Param() param: StatusUpdateDealsParam,
    @Body() statusDto: StatusUpdateDealsBody,
  ): Promise<StatusUpdateDealsResponse> {
    return await this.dealsService.updateStatus(param, statusDto);
  }

  @Delete('delete/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteOne(@Param() param: DeleteDealsParam): Promise<DeleteDealsResponse> {
    return await this.dealsService.deleteOne(param);
  }
}
