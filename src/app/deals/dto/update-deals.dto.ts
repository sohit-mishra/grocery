import {
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsUrl,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class UpdateDealParam {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export enum DealType {
  CATEGORY = "CATEGORY",
  PRODUCT = "PRODUCT",
}

export class UpdateBodyDeals {
  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsNumber()
  @IsOptional()
  dealPercent?: number;

  @IsEnum(DealType)
  @IsOptional()
  dealType?: DealType;

  @IsString()
  @IsOptional()
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

  @IsString()
  @IsOptional()
  productId?: string;

  @IsString()
  @IsOptional()
  productName?: string;

  @IsArray()
  @IsOptional()
  products?: Record<string, any>[];  

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsString()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  topDeal?: boolean;
}

export class UpdateDealsResponse {
  response_code: number;
  response_data: string;
}
