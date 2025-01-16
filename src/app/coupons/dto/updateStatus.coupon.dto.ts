import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateStatusCouponParam {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class UpdateStatusCouponBody {
  @IsBoolean()
  status: boolean;
}

export class UpdateStatusCouponResponse {
  response_code: number;
  response_data: string; 
}
