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
    const [total, data] = await Promise.all([
      this.productModel.countDocuments().exec(),
      this.productModel.find().skip(skip).limit(limit).exec(),
    ]);
    return { total, data };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findSearch(q: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Product>> {
    const searchRegex = new RegExp(q, 'i');
    const skip = (page - 1) * limit;

    const [total, data] = await Promise.all([
      this.productModel.countDocuments({
        $or: [{ name: searchRegex }, { description: searchRegex }],
      }).exec(),
      this.productModel
        .find({ $or: [{ name: searchRegex }, { description: searchRegex }] })
        .skip(skip)
        .limit(limit)
        .exec(),
    ]);

    return { total, data };
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

  async deleteOne(id: string): Promise<void> {
    const product = await this.productModel.findByIdAndDelete(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
