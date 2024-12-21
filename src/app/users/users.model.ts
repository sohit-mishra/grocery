import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { ObjectValue } from '@utils/utils.dto';

export enum ROLE {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  EMPLOYEE = 'EMPLOYEE',
}

export enum VendorStatus {
  PENDING_FOR_APPROVAL = 'PENDING',
  APPROVED = 'APPROVED',
}

export type Role = ObjectValue<typeof ROLE>;

export const USER_MODEL = 'user';

@Schema({ timestamps: false, versionKey: false, _id: false })
export class UploadImage {
  @Prop({ type: String, required: true })
  imageUrl: string;

  @Prop({ type: String })
  imageId?: string;

  @Prop({ type: String })
  filePath?: string;
}

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({
    required: true,
    type: String,
    enum: ROLE,
  })
  role: Role;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  countryCode: string;

  @Prop({ type: String, required: true })
  mobileNumber: string;

  @Prop({ type: String })
  businessName?: string;

  @Prop({ type: String })
  address?: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: USER_MODEL })
  ownerId?: Types.ObjectId;

  @Prop({ type: Boolean, default: true })
  isEmailVerified: boolean;

  @Prop({ type: UploadImage })
  logo?: UploadImage;

  @Prop({ type: UploadImage })
  profilePicture?: UploadImage;

  @Prop({
    required: false,
    type: String,
    enum: VendorStatus,
  })
  vendorStatus: VendorStatus;

  @Prop({ type: String, required: false })
  ownerCode?: string;

  @Prop({ type: UploadImage })
  qrCodeImage?: UploadImage;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: String })
  jobRole?: string;

  @Prop({ type: Number, required: true, default: 0 })
  walletBalance: number;

  @Prop({ type: Number, required: false })
  noOfEmployee?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = Document & User;
