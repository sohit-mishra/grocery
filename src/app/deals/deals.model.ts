import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Deals {
  @Prop({ type: String, required: true, trim: true })
  title: string;

  @Prop({ type: String, required: true, trim: true })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true })
  categoryId: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, required: true })
  categoryName: string;

  @Prop({ type: String, required: true, enum: ['CATEGORY', 'PRODUCT'] })
  dealType: string;

  @Prop({ type: Number, required: true, min: 0 })
  dealPercent: number;

  @Prop({ type: String, required: true })
  imageId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  productId: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, required: true })
  productName: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Product', default: [] })
  products: MongooseSchema.Types.ObjectId[]; 

  @Prop({ type: String, required: true })
  imageUrl: string;

  @Prop({ type: String, required: true })
  filePath: string;

  @Prop({ type: Boolean, default: true })
  status: boolean;

  @Prop({ type: Boolean, default: false })
  topDeal: boolean;
}

export const DealsSchema = SchemaFactory.createForClass(Deals);
export type DealsDocument = Document & Deals;
export const Deals_Model = 'Deals';
