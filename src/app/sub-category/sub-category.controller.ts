import { 
  Controller, 
  Delete, 
  Post, 
  Put, 
  Get, 
  Query, 
  Param, 
  Body
} from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-subCategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subCategory.dto';
import { SubCategoryService } from './sub-category.service';
import {AllSubCategoryResponse,
  OneSubCategoryResponse,
  TypeSubCategoryResponse,
  CreateSubCategoryResponse,
  UpdateSubCategoryResponse,
  StatusUpdateSubCategoryResponse,
  DeleteSubCategoryResponse} from './dto/response.dto'

@Controller('sub-categories/admin')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get('/list')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('q') search: string = '',
  ):Promise<AllSubCategoryResponse> {
    return await this.subCategoryService.findAll(page, limit, search);
  }

  @Get('/dropdown-list/:id')
  async findType(@Param('id') id: string):Promise<TypeSubCategoryResponse> {
    return await this.subCategoryService.findType(id);
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: string):Promise<OneSubCategoryResponse> {
    return await this.subCategoryService.findOne(id);
  }

  @Post('/create')
  async createOne(@Body() createSubCategoryDto: CreateSubCategoryDto):Promise<CreateSubCategoryResponse> {
    return await this.subCategoryService.create(createSubCategoryDto);
  }

  @Put('/update/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ):Promise<UpdateSubCategoryResponse> {
   return await this.subCategoryService.update(id, updateSubCategoryDto);
  }

  @Put('/status-update/:id')
  async StatusUpdate(
    @Param('id') id: string,
    @Body() statusDto: { status: boolean },
  ):Promise<StatusUpdateSubCategoryResponse> {
    const { status } = statusDto;
    return await this.subCategoryService.StatusUpdate(id, status);
  }

  @Delete('/delete/:id')
  async deleteOne(@Param('id') id: string):Promise<DeleteSubCategoryResponse> {
    return await this.subCategoryService.remove(id);
  }

}
