import { Controller, Delete, Get, HttpStatus, Post, Put, Param, Body } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguagesDto } from './dto/create-languages.dto';
import { UpdateLanguagesDto } from './dto/update-languages.dto';

@Controller('languages/admin/')
export class LanguagesController {
    constructor(private readonly languagesService: LanguagesService) {}

    @Get('list')
    async findAll() {
        const languages = await this.languagesService.findAll();
        return {
            response_code: HttpStatus.OK,
            response_data: languages.data,
        };
    }

    @Get('default')
    async findDefault() {
        const defaultLanguage = await this.languagesService.findDefault();
        if (!defaultLanguage) {
            return {
                response_code: HttpStatus.NOT_FOUND,
                response_message: 'Default language not found',
            };
        }
        return {
            response_code: HttpStatus.OK,
            response_data: defaultLanguage,
        };
    }

    @Get('detail/:id')
    async find(@Param('id') id: string) {
        const language = await this.languagesService.findOne(id);
        if (!language) {
            return {
                response_code: HttpStatus.NOT_FOUND,
                response_message: 'Language not found',
            };
        }
        return {
            response_code: HttpStatus.OK,
            response_data: language,
        };
    }

    @Post('create')
    async createOne(@Body() createLanguagesDto: CreateLanguagesDto) {
        const newLanguage = await this.languagesService.create(createLanguagesDto);
        return {
            response_code: HttpStatus.CREATED,
            response_data: newLanguage,
        };
    }

    @Put('update/:id')
    async updateOne(@Param('id') id: string, @Body() updateLanguagesDto: UpdateLanguagesDto) {
        const updatedLanguage = await this.languagesService.update(id, updateLanguagesDto);
        if (!updatedLanguage) {
            return {
                response_code: HttpStatus.NOT_FOUND,
                response_message: 'Language not found for update',
            };
        }
        return {
            response_code: HttpStatus.OK,
            response_data: updatedLanguage,
        };
    }

    @Put('status-update/:id')
    async updateStatus(@Param('id') id: string, @Body() status: { active: boolean }) {
        const updatedStatus = await this.languagesService.updateStatus(id, status.active);
        if (!updatedStatus) {
            return {
                response_code: HttpStatus.NOT_FOUND,
                response_message: 'Language not found for status update',
            };
        }
        return {
            response_code: HttpStatus.OK,
            response_data: updatedStatus,
        };
    }

    @Delete('delete/:id')
    async deleteOne(@Param('id') id: string) {
        const deleteResult = await this.languagesService.remove(id);
        if (!deleteResult) {
            return {
                response_code: HttpStatus.NOT_FOUND,
                response_message: 'Language not found for deletion',
            };
        }
        return {
            response_code: HttpStatus.OK,
            response_message: 'Language deleted successfully',
        };
    }
}
