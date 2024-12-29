import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  keyWords: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  imageUrl?: string;

  @Prop({ required: true })
  categoryId: string;

  @Prop({ required: false })
  imageId?: string;

  @Prop({ required: false })
  type?: string;

  @Prop({ type: [Object], required: true })
  variant: {
    enable: boolean;
    productStock: number;
    unit: string;
    price: number;
    offerPercent: string;
    isSubScriptionAllowed: boolean;
    subScriptionAmount: number;
  }[];

  @Prop({ required: false })
  subCategoryId?: string;

  @Prop({ required: false })
  filePath?: string;

  @Prop({ required: true })
  sku: string;

  @Prop({ type: [Object], required: true })
  productImages: {
    imageUrl: string;
    imageId: string;
    filePath: string;
  }[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
