import {
    Controller,
    Get,
    Query,
    Post,
    Body,
    Patch,
    Delete,
    Param,
    NotFoundException,
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
    ) {
      const pageNumber = parseInt(page, 10) || 1;
      const limitNumber = parseInt(limit, 10) || 10;
      const result = await this.productsService.findAll(pageNumber, limitNumber);
      return {
        status: 'success',
        message: 'Products retrieved successfully',
        total: result.total,
        data: result.data,
      };
    }
  
    @Get('/detail/:id')
    async findOne(@Param('id') id: string) {
      const product = await this.productsService.findOne(id);
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return {
        status: 'success',
        message: 'Product retrieved successfully',
        data: product,
      };
    }
  
    @Post('/create')
    async createOne(@Body() createProductDto: CreateProductDto) {
      const product = await this.productsService.createOne(createProductDto);
      return {
        response_code: 200,
        response_data: 'Product saved successfully',
        data: product,
      };
    }
  
    @Patch('/update/:id')
    async updateOne(
      @Param('id') id: string,
      @Body() updateProductDto: UpdateProductDto,
    ) {
      const updatedProduct = await this.productsService.updateOne(
        id,
        updateProductDto,
      );
      if (!updatedProduct) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return {
        status: 'success',
        message: 'Product updated successfully',
        data: updatedProduct,
      };
    }
  
    @Delete('/delete/:id')
    async deleteOne(@Param('id') id: string) {
      await this.productsService.deleteOne(id);
      return {
        status: 'success',
        message: `Product with ID ${id} deleted successfully`,
      };
    }
  }
  