import {
  IsString,
  IsOptional,
  IsUrl,
  IsBoolean,
  IsIn,
  ValidateIf
} from 'class-validator';


export class CreateBannerDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsIn(['PRODUCT', 'CATEGORY'], {
    message: 'bannerType must be either PRODUCT or CATEGORY',
  })
  bannerType: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o) => !o.productId) 
  categoryId?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o) => !o.categoryId) 
  productId?: string;

  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsOptional()
  filePath?: string;

  @IsString()
  imageId: string;

  @IsBoolean()
  status: boolean;

  @IsString()
  @IsOptional()
  categoryName?: string;

  @IsString()
  @IsOptional()
  productName?: string;
}



export class CreateBannerResponse {
  response_code: number;
  response_data: string;
}
