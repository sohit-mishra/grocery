import { IsMongoId, IsNotEmpty } from "class-validator";

export class OneCouponParam {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class OneCouponResponse {
  response_code: number;
  response_data: any;
}
