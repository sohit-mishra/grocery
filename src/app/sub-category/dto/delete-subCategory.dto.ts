import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class DeleteSubCategoryParam{
    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    id:string;
}


export class DeleteSubCategoryResponse {
    response_code: number;
    response_data: string;
}