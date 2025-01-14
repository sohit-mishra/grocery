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

export class CreateBannerDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsIn(['PRODUCT', 'CATEGORY'], {
    message: 'Invalid bannerType. Allowed values: PRODUCT or CATEGORY.',
  })
  bannerType: string;

  @IsMongoId()
  @IsOptional()
  categoryId?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  productId?: Types.ObjectId;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsOptional()
  filePath?: string;

  @IsString()
  @IsNotEmpty()
  imageId: string;

  @IsBoolean()
  @IsOptional()
  status: boolean = true;

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
