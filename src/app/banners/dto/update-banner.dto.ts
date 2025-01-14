import {
    IsString,
    IsOptional,
    IsUrl,
    IsBoolean,
    IsIn,
    IsNotEmpty,
    IsMongoId,
  } from 'class-validator';
  import { Types } from 'mongoose';
  

  export class UpdateBannerParam {
    @IsMongoId()
    @IsNotEmpty()
    id: string;
  }
  

  export class UpdateBodyBanner {
    @IsString()
    @IsOptional()
    title?: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsString()
    @IsOptional()
    @IsIn(['PRODUCT', 'CATEGORY'], {
      message: 'Invalid bannerType. Allowed values: PRODUCT or CATEGORY.',
    })
    bannerType?: string;
  
    @IsMongoId()
    @IsOptional()
    categoryId?: Types.ObjectId;
  
    @IsMongoId()
    @IsOptional()
    productId?: Types.ObjectId;
  
    @IsUrl()
    @IsOptional()
    imageUrl?: string;
  
    @IsString()
    @IsOptional()
    filePath?: string;
  
    @IsString()
    @IsOptional()
    imageId?: string;
  
    @IsBoolean()
    @IsOptional()
    status?: boolean;
  
    @IsString()
    @IsOptional()
    categoryName?: string;
  
    @IsString()
    @IsOptional()
    productName?: string;
  }
  
  export class UpdateBannerResponse {
    response_code: number;
    response_data: string;
  }
  