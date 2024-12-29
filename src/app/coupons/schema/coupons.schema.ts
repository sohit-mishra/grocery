import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Coupons extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  couponCode: string;

  @Prop({ required: true })
  offerValue: number;

  @Prop({ required: true })
  startDate: number;

  @Prop({ required: true })
  expiryDate: number;

  @Prop({ required: true })
  couponType: string;

  @Prop({ required: true, default: false })
  status: boolean;
}

export const CouponsSchema = SchemaFactory.createForClass(Coupons);
