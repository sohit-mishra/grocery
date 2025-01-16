import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class DeleteLanguagesParam{
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  id:string;
}

export class DeleteLanguagesResponse {
  response_code: number;
  response_data: string;
}
