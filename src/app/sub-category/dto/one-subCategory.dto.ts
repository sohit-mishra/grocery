import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class OneSubCategoryParam{
    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    id:string;
}


export class OneSubCategoryResponse {
    response_code: number;
    response_data: any;
  }