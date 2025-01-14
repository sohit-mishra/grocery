import { Product_Model } from '@app/products/product.model';
import { Categories_Model } from '@app/categories/categories.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export enum BannerType {
  CATEGORY = 'CATEGORY',
  PRODUCT = 'PRODUCT',
}

@Schema({ timestamps: true })
export class Banner{
  _id: Types.ObjectId;

  @Prop({type:String, required: true })
  title: string;

  @Prop({type: String, required:true})
  description: string;

  @Prop({type:String, required: true, enum: BannerType })
  bannerType: BannerType;

  @Prop({ type: SchemaTypes.ObjectId, ref: Categories_Model,required:true })
  categoryId?: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Product_Model, required:true })
  productId?: Types.ObjectId;

  @Prop({type:String, required: true })
  imageUrl: string;

  @Prop({type:String, required:true})
  filePath: string;

  @Prop({type:String, required:true})
  categoryName?: string;

  @Prop({type:String, required:true})
  productName?: string;

  @Prop({type:Boolean, default: false })
  status?: boolean;
}

export const Banner_Model = 'Banner';
export const BannerSchema = SchemaFactory.createForClass(Banner);
export type BannerDocument = Banner & Document;
