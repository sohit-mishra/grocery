import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Chat extends Document {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true, enum: ['USER', 'STORE'] })
  sentBy: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
