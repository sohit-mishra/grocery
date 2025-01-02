import { PartialType } from '@nestjs/mapped-types';
import { CreateBussinessDto } from './create-business.dto';

export class UpdateBusinessDto extends PartialType(CreateBussinessDto) {}
