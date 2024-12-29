import { Controller, Delete, Post, Put, Get, Query, Param, Body } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-subCategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subCategory.dto';
import { SubCategoryService } from './sub-category.service';

@Controller('sub-categories/admin')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get('/list')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const subCategories = await this.subCategoryService.findAll(page, limit);
    return {
      response_code: 200,
      response_data: subCategories,
    };
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: string) {
    const subCategory = await this.subCategoryService.findOne(id);
    if (!subCategory) {
      return {
        response_code: 404,
        response_data: 'SubCategory not found',
      };
    }
    return {
      response_code: 200,
      response_data: subCategory,
    };
  }

  @Post('/create')
  async createOne(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    const newSubCategory = await this.subCategoryService.create(createSubCategoryDto);
    return {
      response_code: 201,
      response_data: 'SubCategory created successfully',
      data: newSubCategory,
    };
  }

  @Put('/update/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto
  ) {
    const updatedSubCategory = await this.subCategoryService.update(id, updateSubCategoryDto);
    if (!updatedSubCategory) {
      return {
        response_code: 404,
        response_data: 'SubCategory not found or update failed',
      };
    }
    return {
      response_code: 200,
      response_data: 'SubCategory updated successfully',
    };
  }

  @Delete('/delete/:id')
  async deleteOne(@Param('id') id: string) {
    const deletedSubCategory = await this.subCategoryService.remove(id);
    if (!deletedSubCategory) {
      return {
        response_code: 404,
        response_data: 'SubCategory not found or deletion failed',
      };
    }
    return {
      response_code: 200,
      response_data: 'SubCategory deleted successfully',
    };
  }
}
