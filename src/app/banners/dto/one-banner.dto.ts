import { Banner } from '../banner.model';
import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class OneBannerParam {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    id: string;
}

export class OneBannerResponse {
  response_code: number;
  response_data: Banner | null;
}