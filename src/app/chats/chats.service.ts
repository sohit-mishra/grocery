import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './schema/chat.schema';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    const createdChat = new this.chatModel(createChatDto);
    return createdChat.save();
  }

  async findAll(page: string, limit: string): Promise<Chat[]> {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.chatModel
      .find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .exec();
  }

  async findOne(chatId: string): Promise<Chat> {
    return this.chatModel.findById(chatId).exec();
  }

  async update(chatId: string, updateChatDto: UpdateChatDto): Promise<Chat> {
    return this.chatModel
      .findByIdAndUpdate(chatId, updateChatDto, { new: true })
      .exec();
  }

  async remove(chatId: string): Promise<void> {
    await this.chatModel.findByIdAndDelete(chatId).exec();
  }
}
