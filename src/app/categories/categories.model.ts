import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Categories{
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  filePath: string;

  @Prop({ required: true })
  imageId: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true , default:false})
  status?: boolean;
 
}

export const Categories_Model = 'Categories';
export const CategoriesSchema = SchemaFactory.createForClass(Categories);
export type CategoriesDocument = Categories & Document;
