import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { Categories } from "../categories.model";

export class AllCategoriesParam {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  q?: string;
}

export class AllCategoriesResponse {
  response_code: number;
  response_data: Categories[];
  total: number;
}
