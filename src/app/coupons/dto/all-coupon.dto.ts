import { IsString, IsInt, IsOptional } from 'class-validator';
import { Coupons } from '../coupons.model';

export class AllCouponQuery {
  @IsInt()
  @IsOptional()
  page: number = 1; 

  @IsInt()
  @IsOptional()
  limit: number = 10; 

  @IsString()
  @IsOptional()
  q?: string; 
}

export class AllCouponResponse {
  response_code: number;
  response_data: Coupons[];
  total: number;
}
