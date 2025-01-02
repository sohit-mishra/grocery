import { Body, Controller, Get, HttpStatus, Put } from '@nestjs/common';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { BusinessService } from './business.service';

@Controller('business/admin/')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('detail')
  async findAll() {
    const getBusiness = await this.businessService.findAll();
    return {
      response_code: HttpStatus.OK,
      response_data: getBusiness,
    };
  }

  @Put('update')
  async updateOne(@Body() updateBusinessDto: UpdateBusinessDto) {
    const updatedBusiness = await this.businessService.updateOne(updateBusinessDto);
    return {
      response_code: HttpStatus.OK,
      response_data: 'Business updated successfully',
    };
  }
}
