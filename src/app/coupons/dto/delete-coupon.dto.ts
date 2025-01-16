import { IsMongoId, IsNotEmpty } from "class-validator";

export class DeleteCouponParam {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class DeleteCouponResponse {
  response_code: number;
  response_data: string;
}
