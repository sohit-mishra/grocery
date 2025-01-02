import { CreateLanguagesDto } from "./create-languages.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateLanguagesDto extends PartialType(CreateLanguagesDto){}