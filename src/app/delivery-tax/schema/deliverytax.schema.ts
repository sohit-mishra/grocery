import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class DeliveryTax extends Document {

  @Prop({ required: true, type: Object })
  location: {
    latitude: number;
    longitude: number;
  };

  @Prop({ required: true })
  startDeliveryFrom: number;

  @Prop({ required: true })
  currencySymbol: string;

  @Prop({ required: true })
  currencyCode: string;

  @Prop({ required: true })
  fixedDeliveryCharges: number;

  @Prop({ default: 0 })
  maxWalletAmountUsed: number;

  @Prop({ required: true, type: Array })
  deliveryTimeSlots: {
    dayCode: number;
    isOpen: boolean;
    timings: {
      openTime: number;
      closeTime: number;
      deliveryCount: number | null;
      isOpen: boolean;
      slot: string;
    }[];
  }[];

  @Prop({ default: 0 })
  deliveryChargePerKm: number;

  @Prop({ default: 100000000000 })
  deliveryCoverage: number;

  @Prop({ default: 'FLEXIBLE' })
  deliveryType: string;

  @Prop({ default: 100 })
  minOrderAmountForFree: number;

  @Prop({ required: true, type: Array })
  paymentMethod: string[];

  @Prop({ required: true })
  taxAmount: number;

  @Prop({ required: true })
  taxName: string;

  @Prop({ required: true })
  taxType: string;

  @Prop({ required: true })
  minimumOrderAmountToPlaceOrder: number;

  @Prop({ required: true, type: Array })
  shippingMethod: string[];
}

export const DeliveryTaxSchema = SchemaFactory.createForClass(DeliveryTax);
