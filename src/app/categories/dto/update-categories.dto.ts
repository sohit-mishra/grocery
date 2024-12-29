import { CreateCategories } from "./create-categories.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateCategories extends PartialType(CreateCategories){}