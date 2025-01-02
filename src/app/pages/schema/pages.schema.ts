import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Page extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  status: boolean;

  @Prop({ required: true }) 
  pageType: string;
}

export const PageSchema = SchemaFactory.createForClass(Page);
