import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class DeliveryBoy extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  mobileNumber: string;

  @Prop()
  countryCode: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ default: 0 })
  orderDelivered: number;

  @Prop({ default: true })
  status: boolean;

  @Prop()
  language: string;

  @Prop({ default: Date.now })
  createdAt: string;
}

export const DeliveryBoySchema = SchemaFactory.createForClass(DeliveryBoy);
