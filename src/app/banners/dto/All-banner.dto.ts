import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Banner } from '../banner.model';

export class AllBannerQuery {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  q?: string;
}

export class AllBannerResponse {
  response_code: number;
  response_data: Banner[];
  total: number;
}
