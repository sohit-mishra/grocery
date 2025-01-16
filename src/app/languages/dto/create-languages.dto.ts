import { IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class CreateLanguagesBody {
  @IsNumber()
  isDefault: number;

  @IsString()
  languageCode: string;

  @IsString()
  languageName: string;

  @IsOptional()
  @IsObject()
  backendJson?: Record<string, string>;

  @IsOptional()
  @IsObject()
  cmsJson?: Record<string, string>;

  @IsOptional()
  @IsObject()
  deliveryAppJson?: Record<string, string>;

  @IsOptional()
  @IsObject()
  mobAppJson?: Record<string, string>;

  @IsOptional()
  @IsObject()
  webJson?: Record<string, string>;
}

export class CreateLanguagesResponse {
  response_code: number;
  response_data: string;
}
