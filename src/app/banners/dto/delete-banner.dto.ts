import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class DeleteBannerParam {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  id: string;
}

export class DeleteBannerResponse {
  response_code: number;
  response_data: string;
}
