import { CreateDeliveryBoyDto } from "./create-delivery-boy.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateDeliveryBoyDto extends PartialType(CreateDeliveryBoyDto){}