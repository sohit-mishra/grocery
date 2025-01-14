import { IsMongoId, IsNotEmpty } from "class-validator";

export class OneCategoriesParam {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}

export class OneCategoriesResponse {
  response_code: number;
  response_data: any;
}
