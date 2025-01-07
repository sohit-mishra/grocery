import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Timing {
  @Prop({ required: true })
  openTime: number;

  @Prop({ required: true })
  closeTime: number;

  @Prop()
  deliveryCount: number;

  @Prop({ required: true, default: true })
  isOpen: boolean;

  @Prop({ required: true })
  slot: string;
}

const TimingSchema = SchemaFactory.createForClass(Timing);

@Schema({ timestamps: true })
export class DeliveryTimeSlot extends Document {
  @Prop({ type: [TimingSchema], required: true })
  timings: Timing[];

  @Prop({ required: true })
  dayCode: number;

  @Prop({ required: true, default: true })
  isOpen: boolean;

  @Prop({ required: true })
  date: string;
}

export const DeliveryTimeSlotSchema = SchemaFactory.createForClass(DeliveryTimeSlot);

@Schema({ collection: 'deliverytaxes', timestamps: true })
export class DeliveryTax extends Document {
  @Prop({ type: [DeliveryTimeSlotSchema], required: true })
  deliveryTimeSlots: DeliveryTimeSlot[];
}

export const DeliveryTaxSchema = SchemaFactory.createForClass(DeliveryTax);
