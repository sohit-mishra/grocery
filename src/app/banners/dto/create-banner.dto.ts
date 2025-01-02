import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateBannerDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  bannerType: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  productId?: string;

  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsOptional()
  filePath?: string;

  @IsString()
  categoryName: string;
}
