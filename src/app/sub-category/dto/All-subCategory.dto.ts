import { IsInt, IsOptional, IsString } from 'class-validator';

export class AllSubCategoryQuery {
  @IsInt()
  @IsOptional()
  page?: number;

  @IsInt()
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  q?: string;
}

export class AllSubCategoryResponse {
  response_code: number;
  response_data: any[];
  total: number;
}
