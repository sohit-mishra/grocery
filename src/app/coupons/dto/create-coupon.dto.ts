import { IsString, IsNumber, IsOptional, IsEnum, IsInt } from 'class-validator';

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

  @IsEnum(['Percentage', 'Amount'])
  couponType: string;
}
