import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto, CreateChatsResponse } from './dto/create-chat.dto';
import { Chat } from './chat.model';
import { OneChartParam, OneChatsResponse } from './dto/one-chat.dto';
import { AllChatsQuery, AllChatsResponse } from './dto/all-chat.dto';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}


  async findAll(query: AllChatsQuery): Promise<AllChatsResponse> {
    const { page, limit } = query;
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    const chats = await this.chatModel
      .find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .exec();

    return {
      response_code: 200,
      response_data: chats,
    };
}


  async findOne(param: OneChartParam): Promise<OneChatsResponse> {
    const { id } = param;
    const chat = await this.chatModel.findById(id).exec();

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }

    return {
      response_code: 200,
      response_data: chat,
    };
  }


  async create(createChatDto: CreateChatDto): Promise<CreateChatsResponse> {
    const createdChat = new this.chatModel(createChatDto);
    await createdChat.save();

    return {
      response_code: 201,
      response_data: 'Chat saved successfully',
    };
  }
}
