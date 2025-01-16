import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})
export class Business {
  @Prop({ required: true })
  storeName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  officeLocation: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  address: string; 
}

export const Business_Model = 'Business';
export const BusinessSchema = SchemaFactory.createForClass(Business);
export type BusinessDocument = Business & Document;
