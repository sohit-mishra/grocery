import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Coupons{
  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, unique: true, trim: true })
  couponCode: string;

  @Prop({ required: true, min: 0 })
  offerValue: number;

  @Prop({ required: true, type: Date })
  startDate: Date;

  @Prop({ required: true, type: Date })
  expiryDate: Date;

  @Prop({ required: true, enum: ['percentage', 'fixed'] })
  couponType: string;

  @Prop({ required: true, default: false })
  status: boolean;
}

export const COUPONS_MODEL = 'Coupons';
export const CouponsSchema = SchemaFactory.createForClass(Coupons);
export type CouponsDocument = Document & Coupons;
