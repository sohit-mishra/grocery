import { Body, Controller, Get, HttpStatus, Put } from '@nestjs/common';
import { PagesService } from './pages.service';
import { UpdatePagesDto } from './dto/update-pages.dto';

@Controller('/pages/admin/')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get('terms-and-conditions')
  async findTermAndConditions() {
    const data = await this.pagesService.findPageByName('terms-and-conditions');
    return {
      response_code: HttpStatus.OK,
      response_data: data,
    };
  }

  @Get('privacy-policy')
  async findPrivacyPolicy() {
    const data = await this.pagesService.findPageByName('privacy-policy');
    return {
      response_code: HttpStatus.OK,
      response_data: data,
    };
  }

  @Get('about-us')
  async findAboutUs() {
    const data = await this.pagesService.findPageByName('about-us');
    return {
      response_code: HttpStatus.OK,
      response_data: data,
    };
  }

  @Put('update')
  async updateData(@Body() updatePageDto: UpdatePagesDto) {
    const updatedPage = await this.pagesService.updatePage(updatePageDto);
    return {
      response_code: HttpStatus.OK,
      response_data: 'Page updated succesfully',
    };
  }
}
