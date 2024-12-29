import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Categories extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  filePath?: string;

  @Prop({ required: false })
  imageId?: string;

  @Prop({ required: false })
  imageUrl?: string;

  @Prop({ required: false , default:false})
  status?: boolean;
 
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
