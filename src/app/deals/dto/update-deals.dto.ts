import { CreateDealsDto } from "./create-deals.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateDealsDto extends PartialType(CreateDealsDto){}