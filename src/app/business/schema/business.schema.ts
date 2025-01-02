import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})
export class Business extends Document {
  @Prop({ required: true })
  storeName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  officeLocation: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: false })
  address: string; 
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
