import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notifications extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ default: false })
  status: boolean;
}

export const NotificationsSchema = SchemaFactory.createForClass(Notifications);
