import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class DefaultLanguagesParam{
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  id:string;
}

export class DefaultLanguagesResponse {
  response_code: number;
  response_data: string;
}
