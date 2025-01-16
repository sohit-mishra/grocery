import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class SubCategory extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Categories', required: true })
  categoryId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: true })
  status: boolean;

  @Prop()
  categoryName?: string;
}

export const SubCategory_Model = 'SubCategory';
export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
export type SubCategoryDocument = SubCategory & Document;
