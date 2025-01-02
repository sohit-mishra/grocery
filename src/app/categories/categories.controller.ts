import { Controller, Delete, Put, Get, Post, Query, Param, Body, BadRequestException, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategories } from './dto/create-categories.dto';
import { UpdateCategories } from './dto/update-categories.dto';

@Controller('categories/admin')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/list')
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('q') search: string = '',
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;


    if (search && !search.trim()) {
      throw new BadRequestException('Search query cannot be empty');
    }

    const result = await this.categoriesService.findAll(pageNumber, limitNumber, search);

    return {
      response_code: HttpStatus.OK,
      response_data: result.data,
      total: result.total,
    };
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: string) {
    const result = await this.categoriesService.findOne(id);
    if (!result) {
      return {
        response_code: HttpStatus.NOT_FOUND,
        response_data: 'Category not found',
      };
    }

    return {
      response_code: HttpStatus.OK,
      response_data: result,
    };
  }

  @Post('/create')
  async createOne(@Body() createCategoryDto: CreateCategories) {
    const result = await this.categoriesService.create(createCategoryDto);
    return {
      response_code: HttpStatus.CREATED,
      response_data: 'Category saved successfully',
    };
  }

  @Put('/update/:id')
  async updateOne(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategories) {
    const result = await this.categoriesService.update(id, updateCategoryDto);
    if (!result) {
      return {
        response_code: HttpStatus.NOT_FOUND,
        response_data: 'Category not found or update failed',
      };
    }

    return {
      response_code: HttpStatus.OK,
      response_data: 'Category updated successfully',
    };
  }

  @Delete('/delete/:id')
  async deleteOne(@Param('id') id: string) {
    const result = await this.categoriesService.remove(id);
    if (!result) {
      return {
        response_code: HttpStatus.NOT_FOUND,
        response_data: 'Category not found or deletion failed',
      };
    }

    return {
      response_code: HttpStatus.OK,
      response_data: 'Category deleted successfully',
    };
  }
}
