import { Controller, Query, Get, HttpStatus } from '@nestjs/common';
import { ProductOutOfStockService } from './product-out-of-stock.service';

@Controller('product-out-of-stock/admin/')
export class ProductOutOfStockController {
  constructor(private readonly productOutOfStockService: ProductOutOfStockService) {}

  @Get('list')
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const productsOutOfStock = await this.productOutOfStockService.findAll(page, limit);
    return {
      response_code: HttpStatus.OK,
      response_data: productsOutOfStock.data,
      total: productsOutOfStock.total,
    };
  }
}
