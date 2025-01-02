import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Delete,
  Param,
  NotFoundException,
  Put,
  HttpStatus,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products/admin')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/list')
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<{
    response_code: number;
    response_message: string;
    total: number;
    response_data: any[];
  }> {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    const result = await this.productsService.findAll(pageNumber, limitNumber);
    return {
      response_code: HttpStatus.OK,
      response_message: 'Products fetched successfully',
      total: result.total,
      response_data: result.data,
    };
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: string): Promise<{
    response_code: number;
    response_message: string;
    response_data: any;
  }> {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return {
      response_code: HttpStatus.OK,
      response_message: 'Product details fetched successfully',
      response_data: product,
    };
  }

  @Get('/search')
  async findSearch(
    @Query('q') q: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<{
    response_code: number;
    response_message: string;
    total: number;
    response_data: any[];
  }> {
    if (!q || !q.trim()) {
      throw new BadRequestException('Search query cannot be empty');
    }

    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    const products = await this.productsService.findSearch(q, pageNumber, limitNumber);
    return {
      response_code: HttpStatus.OK,
      response_message: 'Search results fetched successfully',
      total: products.total,
      response_data: products.data,
    };
  }

  @Post('/create')
  @UsePipes(new ValidationPipe())
  async createOne(@Body() createProductDto: CreateProductDto): Promise<{
    response_code: number;
    response_message: string;
    response_data: any;
  }> {
    const product = await this.productsService.createOne(createProductDto);
    return {
      response_code: HttpStatus.CREATED,
      response_message: 'Product created successfully',
      response_data: product,
    };
  }

  @Put('/update/:id')
  @UsePipes(new ValidationPipe())
  async updateOne(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<{
    response_code: number;
    response_message: string;
    response_data: any;
  }> {
    const updatedProduct = await this.productsService.updateOne(id, updateProductDto);
    return {
      response_code: HttpStatus.OK,
      response_message: 'Product updated successfully',
      response_data: updatedProduct,
    };
  }

  @Delete('/delete/:id')
  async deleteOne(@Param('id') id: string): Promise<{
    response_code: number;
    response_message: string;
  }> {
    await this.productsService.deleteOne(id);
    return {
      response_code: HttpStatus.OK,
      response_message: 'Product deleted successfully',
    };
  }
}
