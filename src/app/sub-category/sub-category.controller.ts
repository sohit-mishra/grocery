import { 
  Controller, 
  Delete, 
  Post, 
  Put, 
  Get, 
  Query, 
  Param, 
  Body, 
  HttpStatus, 
  NotFoundException 
} from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-subCategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subCategory.dto';
import { SubCategoryService } from './sub-category.service';

@Controller('sub-categories/admin')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get('/list')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('q') search: string = '',
  ) {
    const subCategories = await this.subCategoryService.findAll(page, limit, search);
    return {
      response_code: HttpStatus.OK,
      response_data: subCategories.data,
      total: subCategories.total
    };
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: string) {
    const subCategory = await this.subCategoryService.findOne(id);
    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }
    return {
      response_code: HttpStatus.OK,
      response_data: subCategory,
    };
  }

  @Post('/create')
  async createOne(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    const newSubCategory = await this.subCategoryService.create(createSubCategoryDto);
    return {
      response_code: HttpStatus.CREATED,
      response_data :'SubCategory created successfully',
    };
  }

  @Put('/update/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    const updatedSubCategory = await this.subCategoryService.update(id, updateSubCategoryDto);
    if (!updatedSubCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found or update failed`);
    }
    return {
      response_code: HttpStatus.OK,
      response_data: 'SubCategory updated successfully'
    };
  }

  @Delete('/delete/:id')
  async deleteOne(@Param('id') id: string) {
    const deletedSubCategory = await this.subCategoryService.remove(id);
    if (!deletedSubCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found or deletion failed`);
    }
    return {
      response_code: HttpStatus.OK,
      response_data: 'SubCategory deleted successfully',
    };
  }
}
