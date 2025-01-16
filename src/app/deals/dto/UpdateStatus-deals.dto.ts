import { IsMongoId, IsNotEmpty, IsBoolean } from "class-validator";

export class StatusUpdateDealsParam {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class StatusUpdateDealsBody {
  @IsBoolean()
  status: boolean;
}

export class StatusUpdateDealsResponse {
  response_code: number;
  response_data: string;
}
