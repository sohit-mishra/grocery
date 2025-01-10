import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notifications extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ required: true })
  notifyType: string;
}

export const NotificationsSchema = SchemaFactory.createForClass(Notifications);
