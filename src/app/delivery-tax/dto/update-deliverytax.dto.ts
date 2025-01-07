import { CreateDeliveryTaxDto } from "./create-deliverytax.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateDeliveryTaxDto extends PartialType(CreateDeliveryTaxDto){}