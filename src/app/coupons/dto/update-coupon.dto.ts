import { CreateCouponDto } from "../dto/create-coupon.dto";  
import { PartialType } from "@nestjs/mapped-types";

export class UpdateCouponDto extends PartialType(CreateCouponDto) {}
