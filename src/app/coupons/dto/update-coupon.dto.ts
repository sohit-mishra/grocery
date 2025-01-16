import { IsMongoId, IsNotEmpty, IsString, IsInt, IsEnum } from 'class-validator';

export class UpdateCouponParam {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export enum CouponType {
  PERCENTAGE = 'PERCENTAGE',
  AMOUNT = 'AMOUNT',
}

export class UpdateCouponBody {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  couponCode: string;

  @IsInt()
  offerValue: number;

  @IsInt()
  startDate: number;

  @IsInt()
  expiryDate: number;

  @IsEnum(CouponType)
  @IsNotEmpty()
  couponType: CouponType;
}

export class UpdateCouponResponse {
  response_code: number;
  response_data: string; 
}
