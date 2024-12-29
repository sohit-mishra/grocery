import { IsString, IsArray, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  keyWords: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  categoryId: string;

  @IsString()
  @IsOptional()
  imageId?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsArray()
  variant: {
    enable: boolean;
    productStock: number;
    unit: string;
    price: number;
    offerPercent: string;
    isSubScriptionAllowed: boolean;
    subScriptionAmount: number;
  }[];

  @IsString()
  @IsOptional()
  subCategoryId?: string;

  @IsString()
  @IsOptional()
  filePath?: string;

  @IsString()
  sku: string;

  @IsArray()
  productImages: {
    imageUrl: string;
    imageId: string;
    filePath: string;
  }[];
}
