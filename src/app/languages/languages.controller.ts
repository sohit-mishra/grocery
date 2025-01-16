import { Controller, Delete, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguagesBody, CreateLanguagesResponse } from './dto/create-languages.dto';
import { UpdateLanguagesBody, UpdateLanguagesParam, UpdateLanguagesResponse } from './dto/update-languages.dto';
import { Roles } from '@core/decorators/roles.decorator';
import { ROLE } from '@app/users/users.model';
import { JwtAuthGuard } from '@core/guards/auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { DefaultLanguagesParam, DefaultLanguagesResponse } from './dto/default-language.dto';
import { AllLanguagesResponse } from './dto/all-languages.dto';
import { OneLanguagesParam, OneLanguagesResponse } from './dto/one-languages.dto';
import { StatusUpdateLanguagesBody, StatusUpdateLanguagesParam, StatusUpdateLanguagesResponse } from './dto/status-language.dto';
import { DeleteLanguagesParam, DeleteLanguagesResponse } from './dto/delete-language.dto';

@Controller('languages/admin/')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get('list')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async findAll(): Promise<AllLanguagesResponse> {
    return await this.languagesService.findAll();
  }

  @Get('default/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async findDefault(@Param() param: DefaultLanguagesParam): Promise<DefaultLanguagesResponse> {
    return await this.languagesService.findDefault(param);
    
  }

  @Get('detail/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async find(@Param() param: OneLanguagesParam): Promise<OneLanguagesResponse> {
    return await this.languagesService.findOne(param);
    
  }

  @Post('create')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async createOne(@Body() createLanguagesDto: CreateLanguagesBody): Promise<CreateLanguagesResponse> {
    return await this.languagesService.create(createLanguagesDto);
  }

  @Put('update/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async updateOne(@Param() param: UpdateLanguagesParam, @Body() updateLanguagesBody: UpdateLanguagesBody): Promise<UpdateLanguagesResponse> {
    return await this.languagesService.update(param, updateLanguagesBody);
  }

  @Put('status-update/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async updateStatus(@Param() param: StatusUpdateLanguagesParam, @Body() update:StatusUpdateLanguagesBody): Promise<StatusUpdateLanguagesResponse> {
    return await this.languagesService.updateStatus(param, update);
    
  }

  @Delete('delete/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  async deleteOne(@Param() param: DeleteLanguagesParam): Promise<DeleteLanguagesResponse> {
    return await this.languagesService.remove(param);
  }
}
