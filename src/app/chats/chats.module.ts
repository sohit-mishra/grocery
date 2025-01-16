import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat_Model, ChatSchema } from './chat.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat_Model, schema: ChatSchema }]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
