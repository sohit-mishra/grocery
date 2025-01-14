import { IsString, IsOptional, IsUrl, IsBoolean, IsMongoId } from 'class-validator';

export class UpdateCategoriesParam {
  @IsMongoId()
  @IsString()
  id: string;
}

export class UpdateBodyCategories {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  @IsOptional()
  filePath?: string;

  @IsString()
  @IsOptional()
  imageId?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}

export class UpdateCategoriesResponse {
  response_code: number;
  response_data: string;
}
