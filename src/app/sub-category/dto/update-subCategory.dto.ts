import { IsMongoId, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateSubCategoryParam {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class UpdateSubCategoryBody {
  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}

export class UpdateSubCategoryResponse {
  response_code: number;
  response_data: string;
}
