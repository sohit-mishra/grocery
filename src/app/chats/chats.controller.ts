import { Controller, Get, HttpStatus, Param, Query, Post, Body, Put, Delete, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chats/admin')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get('/group')
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    try {
      const chats = await this.chatsService.findAll(page, limit);
      return {
        response_code: HttpStatus.OK,
        response_data: chats,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve chats');
    }
  }

  @Get('/:chatId')
  async findOne(@Param('chatId') chatId: string) {
    try {
      const chat = await this.chatsService.findOne(chatId);
      if (!chat) {
        throw new NotFoundException(`Chat with ID ${chatId} not found`);
      }
      return {
        response_code: HttpStatus.OK,
        response_data: chat,
      };
    } catch (error) {
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('Failed to retrieve chat');
    }
  }

  @Post()
  async create(@Body() createChatDto: CreateChatDto) {
    try {
      const newChat = await this.chatsService.create(createChatDto);
      return {
        response_code: HttpStatus.CREATED,
        response_data: "Success saved", 
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create chat');
    }
  }

  @Put('/:chatId')
  async update(@Param('chatId') chatId: string, @Body() updateChatDto: UpdateChatDto) {
    try {
      const updatedChat = await this.chatsService.update(chatId, updateChatDto);
      if (!updatedChat) {
        throw new NotFoundException(`Chat with ID ${chatId} not found`);
      }
      return {
        response_code: HttpStatus.OK,
        response_data: "Successfully updated",
      };
    } catch (error) {
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('Failed to update chat');
    }
  }

  @Delete('/:chatId')
  async remove(@Param('chatId') chatId: string) {
    try {
      const deletedChat = await this.chatsService.remove(chatId);
     
      return {
        response_code: HttpStatus.OK,
        response_data: "Chat Deleted Successfully",
      };
    } catch (error) {
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('Failed to delete chat');
    }
  }
}
