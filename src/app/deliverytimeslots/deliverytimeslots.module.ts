import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliverytimeslotsService } from './deliverytimeslots.service';
import { DeliverytimeslotsController } from './deliverytimeslots.controller';
import { DeliveryTimeSlot, DeliveryTimeSlotSchema } from './schema/delivery-time-slots.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliveryTimeSlot.name, schema: DeliveryTimeSlotSchema }
    ])
  ],
  controllers: [DeliverytimeslotsController],
  providers: [DeliverytimeslotsService]
})
export class DeliverytimeslotsModule {}
