import { IsString, IsOptional, IsUrl, IsBoolean } from 'class-validator';

export class CreateCategories {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  filePath: string;

  @IsString()
  @IsOptional()
  imageId: string;

  @IsUrl()
  @IsOptional()
  imageUrl: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;
}

export class CreateCategoriesResponse {
  response_code: number;
  response_data: string;
}
