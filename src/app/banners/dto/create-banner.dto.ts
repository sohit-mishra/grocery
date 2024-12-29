import { IsString, IsArray, IsOptional, IsNumber, IsBoolean } from 'class-validator';

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

    @IsString()
    imageUrl: string;

    @IsString()
    @IsOptional()
    filePath?: string;

    @IsString()
    categoryName: string;
}
