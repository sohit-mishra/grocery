import { CreateSubCategoryDto } from './create-subCategory.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {}
