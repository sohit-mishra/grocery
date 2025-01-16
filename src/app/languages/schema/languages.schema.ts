import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Languages extends Document {
  @Prop({ required: true, unique: true })
  languageCode: string;

  @Prop({ required: true })
  languageName: string;

  @Prop({ type: Number, default: 0 }) 
  isDefault: number;

  @Prop({ type: Object, default: {} })
  backendJson: Record<string, string>;

  @Prop({ type: Object, default: {} })
  cmsJson: Record<string, string>;

  @Prop({ type: Object, default: {} })
  deliveryAppJson: Record<string, string>;

  @Prop({ type: Object, default: {} })
  mobAppJson: Record<string, string>;

  @Prop({ type: Object, default: {} })
  webJson: Record<string, string>;

  @Prop({ type: Number, default: 1 }) 
  status: number;
}

export const LanguagesSchema = SchemaFactory.createForClass(Languages);
