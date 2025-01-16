import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class StatusUpdateLanguagesParam {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class StatusUpdateLanguagesBody{
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}

export class StatusUpdateLanguagesResponse {
  response_code: number;
  response_data: string;
}
