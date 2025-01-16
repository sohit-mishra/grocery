import { IsOptional, IsInt, Min, IsString } from "class-validator";
import { Deals } from "../deals.model";

export class AllDealsQuery{
    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number;
  
    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number;
  
    @IsOptional()
    @IsString()
    q?: string;
}

export class AllDealsResponse {
    response_code: number;
    response_data: Deals[];
    total: number;
}
  