import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ROLE, Role } from '../users.model';
import { Types } from 'mongoose';

export class CreateUserBody {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  countryCode: string;

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone()
  mobileNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ROLE)
  role: Role;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((body: CreateUserBody) => body.role === ROLE.OWNER)
  businessType?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((body: CreateUserBody) => body.role === ROLE.OWNER)
  businessName?: string;

  @IsOptional()
  @IsString()
  jobRole?: string;

  @IsOptional()
  @IsNumber()
  noOfEmployee?: number;

  @IsOptional()
  @IsString()
  vendorStatus?: string;
}

export class CreateUserResponse {
  message: string;
  id: Types.ObjectId;
  ownerId?: Types.ObjectId;
}

export class CreateUserInput extends CreateUserBody {
  role: Role;
  ownerCode: string;
}
