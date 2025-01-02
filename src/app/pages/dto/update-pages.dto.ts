import { CreatePagesDto } from "./create-pages.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdatePagesDto extends PartialType(CreatePagesDto){}