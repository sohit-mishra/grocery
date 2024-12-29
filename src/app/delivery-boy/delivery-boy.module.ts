import { Module } from '@nestjs/common';
import { DeliveryBoyService } from './delivery-boy.service';
import { DeliveryBoyController } from './delivery-boy.controller';

@Module({
  providers: [DeliveryBoyService],
  controllers: [DeliveryBoyController]
})
export class DeliveryBoyModule {}
