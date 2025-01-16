import { 
  Controller, 
  Delete, 
  Post, 
  Put, 
  Get, 
  Query, 
  Param, 
  Body,
  UseGuards
} from '@nestjs/common';
import { CreateSubCategoryDto, CreateSubCategoryResponse } from './dto/create-subCategory.dto';
import { UpdateSubCategoryBody, UpdateSubCategoryParam, UpdateSubCategoryResponse } from './dto/update-subCategory.dto';
import { SubCategoryService } from './sub-category.service';
import {
  StatusUpdateSubCategoryResponse,
  StatusUpdateSubCategoryBody,
  StatusUpdateSubCategoryParam} from './dto/statusupdateSubCategory.dto'
import { DeleteSubCategoryParam, DeleteSubCategoryResponse } from './dto/delete-subCategory.dto';
import { Roles } from '@core/decorators/roles.decorator';
import { ROLE } from '@app/users/users.model';
import { JwtAuthGuard } from '@core/guards/auth.guard';
import { TypeSubCategoryParam, TypeSubCategoryResponse } from './dto/type-subCategory.dto';
import { AllSubCategoryQuery, AllSubCategoryResponse } from './dto/All-subCategory.dto';
import { OneSubCategoryParam, OneSubCategoryResponse } from './dto/one-subCategory.dto';
import { RolesGuard } from '@core/guards/roles.guard';

@Controller('sub-categories/admin')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get('/list')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async findAll(
    @Query() query:AllSubCategoryQuery,
  ):Promise<AllSubCategoryResponse> {
    return await this.subCategoryService.findAll(query);
  }

  @Get('/dropdown-list/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async findType(@Param() param: TypeSubCategoryParam):Promise<TypeSubCategoryResponse> {
    return await this.subCategoryService.findType(param);
  }

  @Get('/detail/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async findOne(@Param() param: OneSubCategoryParam):Promise<OneSubCategoryResponse> {
    return await this.subCategoryService.findOne(param);
  }

  @Post('/create')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async createOne(@Body() createSubCategoryDto: CreateSubCategoryDto):Promise<CreateSubCategoryResponse> {
    return await this.subCategoryService.create(createSubCategoryDto);
  }

  @Put('/update/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async updateOne(
    @Param() param: UpdateSubCategoryParam,
    @Body() update: UpdateSubCategoryBody,
  ):Promise<UpdateSubCategoryResponse> {
   return await this.subCategoryService.update(param, update);
  }

  @Put('/status-update/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async updateStatus(
    @Param() param: StatusUpdateSubCategoryParam,
    @Body() update: StatusUpdateSubCategoryBody,
  ):Promise<StatusUpdateSubCategoryResponse> {
    return await this.subCategoryService.updateStatus(param, update);
  }

  @Delete('/delete/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async deleteOne(@Param() param: DeleteSubCategoryParam):Promise<DeleteSubCategoryResponse> {
    return await this.subCategoryService.remove(param);
  }

}
