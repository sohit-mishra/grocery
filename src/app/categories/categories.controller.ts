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
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  CreateCategories,
  CreateCategoriesResponse,
} from './dto/create-categories.dto';
import {
  UpdateCategoriesParam,
  UpdateBodyCategories,
  UpdateCategoriesResponse,
} from './dto/update-categories.dto';
import {
  AllCategoriesParam,
  AllCategoriesResponse,
} from './dto/All-categories.dto';
import {
  DeleteCategoriesParam,
  DeleteCategoriesResponse,
} from './dto/delete-categories.dto';
import { DropdownCategoriesResponse } from './dto/DropdownCategories.dto';
import { ImageCategoriesResponse } from './dto/ImageCategories.dto';
import {
  OneCategoriesParam,
  OneCategoriesResponse,
} from './dto/one-categories.dto';
import {
  UpdateStatusCategoriesParam,
  UpdateStatusCategoriesResponse,
  UpdateStatusCategories,
} from './dto/UpdateStatusCategories.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from '@core/services/storage.service';
import { Roles } from '@core/decorators/roles.decorator';
import { ROLE } from '@app/users/users.model';
import { JwtAuthGuard } from '@core/guards/auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';

@Controller('categories/admin')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly storageService: StorageService,
  ) {}

  @Get('/list')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(
    @Query() query: AllCategoriesParam,
  ): Promise<AllCategoriesResponse> {
    return this.categoriesService.findAll(query);
  }

  @Get('/dropdown-list')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async findDropdownList(): Promise<DropdownCategoriesResponse> {
    return this.categoriesService.getDropdownList();
  }

  @Get('/detail/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async findOne(
    @Param() param: OneCategoriesParam,
  ): Promise<OneCategoriesResponse> {
    return this.categoriesService.findOne(param);
  }

  @Post('/create')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async createOne(
    @Body() createCategoryDto: CreateCategories,
  ): Promise<CreateCategoriesResponse> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Post('/upload/image')
  @UseInterceptors(FileInterceptor('file'))
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageCategoriesResponse> {
    return await this.categoriesService.uploadImage(file);
  }

  @Put('/update/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async updateOne(
    @Param() param: UpdateCategoriesParam,
    @Body() update: UpdateBodyCategories,
  ): Promise<UpdateCategoriesResponse> {
    return this.categoriesService.update(param, update);
  }

  @Put('/status-update/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async updateStatus(
    @Param() param: UpdateStatusCategoriesParam,
    @Body() statusDto: UpdateStatusCategories,
  ): Promise<UpdateStatusCategoriesResponse> {
    return this.categoriesService.updateStatus(param, statusDto);
  }

  @Delete('/delete/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async deleteOne(
    @Param() param: DeleteCategoriesParam,
  ): Promise<DeleteCategoriesResponse> {
    return this.categoriesService.delete(param);
  }
}
