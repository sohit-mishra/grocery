import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum BannerType {
  Category = 'Category',
  Banner = 'Banner',
}

@Schema()
export class Banner extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true, enum: BannerType })
  bannerType: BannerType;

  @Prop({ index: true })
  categoryId?: string;

  @Prop({ index: true })
  productId?: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  filePath?: string;

  @Prop({ required: true, index: true })
  categoryName: string;

  @Prop({ default: false })
  isDeleted?: boolean;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
