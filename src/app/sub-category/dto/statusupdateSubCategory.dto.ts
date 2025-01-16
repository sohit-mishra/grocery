import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from "class-validator";


export class StatusUpdateSubCategoryParam{
    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    id:string;
}

export class StatusUpdateSubCategoryBody{
    @IsBoolean()
    @IsNotEmpty()
    status:boolean;
}


export class StatusUpdateSubCategoryResponse {
  response_code: number;
  response_data: string;
}

