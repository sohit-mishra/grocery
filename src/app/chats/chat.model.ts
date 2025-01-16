import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) 
export class Chat {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true, enum: ['USER', 'STORE'] })
  sentBy: string;

  @Prop({ required: true })
  userId: string;
}

export const Chat_Model = 'Chat';
export const ChatSchema = SchemaFactory.createForClass(Chat);
export type ChatDocument = Chat & Document;
