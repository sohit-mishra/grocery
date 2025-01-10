import { IsString, IsOptional, IsNumber, IsBoolean, IsArray, IsUrl, IsEnum } from "class-validator";

export enum DealType {
  CATEGORY = "CATEGORY",
  PRODUCT = "PRODUCT",
}

export class CreateDealsDto {
  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsNumber()
  dealPercent: number;

  @IsEnum(DealType)
  dealType: DealType;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  filePath?: string;

  @IsString()
  @IsOptional()
  imageId: string;

  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsOptional()
  productId?: string;

  @IsString()
  @IsOptional()
  productName?: string;

  @IsArray()
  @IsOptional()
  products?: any[]; 

  @IsBoolean()
  status: boolean;

  @IsString()
  title: string;

  @IsBoolean()
  topDeal: boolean;
}
