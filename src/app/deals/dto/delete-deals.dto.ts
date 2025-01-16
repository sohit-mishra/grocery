import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class DeleteDealsParam{
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  id:string;
}


export class DeleteDealsResponse {
  response_code: number;
  response_data: string;
}