import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class TypeSubCategoryParam {
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class TypeSubCategoryResponse {
  response_code: number;
  response_data: any;
}
