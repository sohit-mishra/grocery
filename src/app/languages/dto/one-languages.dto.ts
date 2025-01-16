import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class OneLanguagesParam{
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  id:string;
}

export class OneLanguagesResponse {
  response_code: number;
  response_data: any;
}
