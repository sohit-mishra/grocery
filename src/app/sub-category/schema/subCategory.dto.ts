import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SubCategory extends Document {
  @Prop({ required: true })
  categoryId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ default: true })
  status: boolean;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
