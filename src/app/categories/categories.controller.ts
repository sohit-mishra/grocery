import {
  Controller,
  Put,
  Get,
  Post,
  Delete,
  Query,
  Param,
  Body,
  UploadedFile,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategories } from './dto/create-categories.dto';
import { UpdateCategories } from './dto/update-categories.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from '@core/services/storage.service';
import {
  AllCategoriesResponse,
  DropdownCategoriesResponse,
  OneCategoriesResponse,
  CreateCategoriesResponse,
  UpdateCategoriesResponse,
  UpdateStatusCategoriesResponse,
  DeleteCategoriesResponse,
  ImageCategoriesResponse,
} from './dto/response.dto';

@Controller('categories/admin')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly storageService: StorageService,
  ) {}

  @Get('/list')
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('q') search: string = '',
  ): Promise<AllCategoriesResponse> {
    const pageNumber = Math.max(parseInt(page, 10), 1);
    const limitNumber = Math.min(Math.max(parseInt(limit, 10), 1), 100);

    if (search && !search.trim()) {
      throw new Error('Search query cannot be empty');
    }

    return this.categoriesService.findAll(pageNumber, limitNumber, search);
  }

  @Get('/dropdown-list')
  async findDropdownList(): Promise<DropdownCategoriesResponse> {
    return this.categoriesService.getDropdownList();
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: string): Promise<OneCategoriesResponse> {
    return this.categoriesService.findOne(id);
  }

  @Post('/create')
  async createOne(
    @Body() createCategoryDto: CreateCategories,
  ): Promise<CreateCategoriesResponse> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Post('/upload/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageCategoriesResponse> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return await this.categoriesService.uploadImage(file);
  }

  @Put('/update/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() update: UpdateCategories,
  ): Promise<UpdateCategoriesResponse> {
    return this.categoriesService.update(id, update);
  }

  @Put('/status-update/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() statusDto: { status: boolean },
  ): Promise<UpdateStatusCategoriesResponse> {
    const { status } = statusDto;
    return this.categoriesService.updateStatus(id, status);
  }

  @Delete('/delete/:id')
  async deleteOne(@Param('id') id: string): Promise<DeleteCategoriesResponse> {
    return this.categoriesService.delete(id);
  }
}
