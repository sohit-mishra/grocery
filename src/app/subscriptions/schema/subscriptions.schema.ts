import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

@Schema()
export class Subscription extends Document {
  @Prop({ required: true })
  subscriptionCount: number;

  @Prop({ type: UserSchema })
  user: User;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
