import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Orders } from './schema/orders.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Orders.name) private readonly orderModel: Model<Orders>) {}

  async findAll(query: { q?: string; limit?: number; page?: number; type?: string }): Promise<{ data: Orders[]; total: number }> {
    const { q = '', limit = 10, page = 1, type } = query;
    const pageSize = Math.max(1, limit);
    const pageNumber = Math.max(1, page);
    const filter: any = {};

    if (q) {
      filter.$text = { $search: q };
    }
    if (type) {
      filter.type = type;
    }

    const orders = await this.orderModel
      .find(filter)
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize)
      .sort({ createdAt: -1 })
      .exec();

    const total = await this.orderModel.countDocuments(filter);
    return { data: orders, total };
  }

  async findOne(id: string): Promise<Orders> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Orders> {
    const newOrder = new this.orderModel(createOrderDto);
    return newOrder.save();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Orders> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  }

  async delete(id: string): Promise<Orders> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deletedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return deletedOrder;
  }

  async deleteItem(orderId: string, productId: string): Promise<Orders> {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    order.cart = order.cart.filter((item) => item.productId.toString() !== productId);
    return order.save();
  }
}
