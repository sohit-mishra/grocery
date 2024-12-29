import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Banner extends Document {
    @Prop({ required: true })
    title: string;

    @Prop()
    description?: string;

    @Prop({ required: true })
    bannerType: string;

    @Prop()
    categoryId?: string;

    @Prop()
    productId?: string;

    @Prop({ required: true })
    imageUrl: string;

    @Prop()
    filePath?: string;

    @Prop({ required: true })
    categoryName: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
