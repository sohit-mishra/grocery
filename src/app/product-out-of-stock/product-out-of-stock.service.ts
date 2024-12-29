import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../products/schema/product.schema';

@Injectable()
export class ProductOutOfStockService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const productsOutOfStock = await this.productModel
      .find({ 'variant.productStock': 0 })
      .select({ 
        variant: 0, 
        subCategoryId: 0, 
        filePath: 0, 
        productImages: 0, 
        sku: 0 
      })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.productModel
      .countDocuments({ 'variant.productStock': 0 })
      .exec();

    return {
      data: productsOutOfStock,
      total: total,
    };
  }
}
