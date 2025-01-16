import { IsMongoId, IsNotEmpty, IsString, IsNumber, IsObject, IsOptional } from "class-validator";

export class UpdateLanguagesParam {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UpdateLanguagesBody {
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

export class UpdateLanguagesResponse {
  response_code: number;
  response_data: string;
}
