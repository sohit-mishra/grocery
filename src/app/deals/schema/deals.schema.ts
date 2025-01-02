import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Deals extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  categoryId: string;

  @Prop({ required: true })
  categoryName: string;

  @Prop({ required: true, enum: ['CATEGORY', 'PRODUCT'] })
  dealType: string;

  @Prop({ required: true })
  dealPercent: number;

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
