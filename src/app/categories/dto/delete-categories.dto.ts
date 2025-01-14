import { IsMongoId, IsString, IsNotEmpty } from "class-validator";

export class DeleteCategoriesParam {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  id: string;
}

export class DeleteCategoriesResponse {
  response_code: number;
  response_data: string;
}
