import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
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

export class CreateSubCategoryResponse {
  response_code: number;
  response_data: string;
}
