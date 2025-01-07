import { CreateDeliveryTimeSlotDto } from "./create-delivery-time-slots.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateDeliveryTimeSlotDto extends PartialType(CreateDeliveryTimeSlotDto){}