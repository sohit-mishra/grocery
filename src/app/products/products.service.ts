import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schema/product.schema';

interface PaginatedResponse<T> {
  total: number;
  data: T[];
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async findAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Product>> {
    const skip = (page - 1) * limit;
    const total = await this.productModel.countDocuments();
    const data = await this.productModel.find().skip(skip).limit(limit).exec();
    return { total, data };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async createOne(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async updateOne(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true, runValidators: true },
    ).exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return updatedProduct;
  }

  async deleteOne(id: string): Promise<{ message: string }> {
    await this.findOne(id);
    await this.productModel.findByIdAndDelete(id).exec();
    return { message: `Product with ID ${id} has been deleted successfully.` };
  }
}
