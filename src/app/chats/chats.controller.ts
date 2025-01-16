import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto, CreateChatsResponse } from './dto/create-chat.dto';
import { OneChatsResponse, OneChartParam } from './dto/one-chat.dto';
import { Roles } from '@core/decorators/roles.decorator';
import { ROLE } from '@app/users/users.model';
import { JwtAuthGuard } from '@core/guards/auth.guard';
import { AllChatsQuery, AllChatsResponse } from './dto/all-chat.dto';
import { RolesGuard } from '@core/guards/roles.guard';

@Controller('chats/admin')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get('/list')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  findAll(@Query() query: AllChatsQuery): Promise<AllChatsResponse> {
    return this.chatsService.findAll(query);
  }

 
  @Get('/:id')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  findOne(@Param() param: OneChartParam): Promise<OneChatsResponse> {
    return this.chatsService.findOne(param);
  }


  @Post('/create')
  @Roles(ROLE.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  create(@Body() createChatDto: CreateChatDto): Promise<CreateChatsResponse> {
    return this.chatsService.create(createChatDto);
  }
}
