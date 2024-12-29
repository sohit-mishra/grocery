import { CreateCouponDto } from "../dto/create-coupon.schema";  
import { PartialType } from "@nestjs/mapped-types";

export class UpdateCouponDto extends PartialType(CreateCouponDto) {}
