import { IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TimingDto {
  @IsNumber()
  openTime: number;

  @IsNumber()
  closeTime: number;

  @IsOptional()
  @IsNumber()
  deliveryCount?: number;

  @IsBoolean()
  isOpen: boolean;

  @IsString()
  slot: string;
}

class DeliveryTimeSlotDto {
  @ValidateNested({ each: true })
  @Type(() => TimingDto)
  timings: TimingDto[];

  @IsNumber()
  dayCode: number;

  @IsBoolean()
  isOpen: boolean;

  @IsString()
  date: string;
}

export class CreateDeliveryTimeSlotDto {
  @ValidateNested({ each: true })
  @Type(() => DeliveryTimeSlotDto)
  deliveryTimeSlots: DeliveryTimeSlotDto[];
}
