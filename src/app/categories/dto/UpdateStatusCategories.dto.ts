import { IsBoolean, IsMongoId, IsNotEmpty } from "class-validator";

export class UpdateStatusCategoriesParam {
  @IsMongoId()
  id: string;
}

export class UpdateStatusCategories {
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}

export class UpdateStatusCategoriesResponse {
  response_code: number;
  response_data: string;
}
