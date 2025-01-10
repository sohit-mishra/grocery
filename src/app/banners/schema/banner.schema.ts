import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum BannerType {
  CATEGORY = 'CATEGORY',
  PRODUCT = 'PRODUCT',
}

@Schema({ timestamps: true })
export class Banner extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true, enum: BannerType })
  bannerType: BannerType;

  
  @Prop({ index: true, sparse: true })
  categoryId?: string;

  @Prop({ index: true, sparse: true })
  productId?: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  filePath?: string;

  @Prop()
  categoryName?: string;

  @Prop()
  productName?: string;

  @Prop({ default: false })
  status?: boolean;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
