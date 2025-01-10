import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Deals extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  categoryId?: string;

  @Prop()
  categoryName?: string;

  @Prop({ required: true, enum: ['CATEGORY', 'PRODUCT'] })
  dealType: string;

  @Prop({ required: true, min: 0 })
  dealPercent: number;

  @Prop({ required: true })
  imageId: string;

  @Prop()
  productId?: string;

  @Prop()
  productName?: string;

  @Prop({ type: [String], default: [] })
  products: string[];

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  filePath?: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ default: false })
  topDeal: boolean;
}

export const DealsSchema = SchemaFactory.createForClass(Deals);
