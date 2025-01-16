import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class OneDealsParam{
    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    id:string;
}

export class OneDealsResponse {
    response_code: number;
    response_data: any;
}