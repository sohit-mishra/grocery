import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Languages extends Document {
  @Prop({ required: true, unique: true })
  languageCode: string;

  @Prop({ required: true })
  languageName: string;

  @Prop({ default: false })
  isDefault: boolean;

  @Prop({ default: true })
  isActive: boolean;
}

export const LanguagesSchema = SchemaFactory.createForClass(Languages);
