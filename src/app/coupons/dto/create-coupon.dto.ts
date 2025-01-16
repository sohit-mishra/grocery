import { IsString, IsNumber, IsOptional, IsEnum, IsInt } from 'class-validator';

export enum CouponType {
  PERCENTAGE = 'PERCENTAGE',
  AMOUNT = 'AMOUNT',
}

export class CreateCouponDto {
  @IsString()
  description: string;

  @IsString()
  couponCode: string;

  @IsNumber()
  @IsInt()
  offerValue: number;

  @IsNumber()
  @IsInt()
  startDate: number;

  @IsNumber()
  @IsInt()
  expiryDate: number;

  @IsEnum(CouponType)
  couponType: CouponType;
}

export class CreateCouponResponse {
  response_code: number;
  response_data: string;
}
