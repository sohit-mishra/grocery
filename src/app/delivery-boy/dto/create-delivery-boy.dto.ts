import { IsString, IsEmail, IsOptional, IsPhoneNumber, IsNumber, IsBoolean } from 'class-validator';

export class CreateDeliveryBoyDto {
  @IsString()
  @IsOptional()
  readonly _id: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsPhoneNumber('IN')
  readonly mobileNumber: string;

  @IsString()
  @IsOptional()
  readonly countryCode: string;

  @IsBoolean()
  readonly emailVerified: boolean;

  @IsNumber()
  readonly orderDelivered: number;

  @IsBoolean()
  readonly status: boolean;

  @IsString()
  @IsOptional()
  readonly language: string;

  @IsString()
  @IsOptional()
  readonly createdAt: string;
}
