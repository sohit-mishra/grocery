import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryBoyService } from './delivery-boy.service';
import { DeliveryBoyController } from './delivery-boy.controller';
import { DeliveryBoy, DeliveryBoySchema } from './schema/delivery-boy.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DeliveryBoy.name, schema: DeliveryBoySchema }]),
  ],
  providers: [DeliveryBoyService],
  controllers: [DeliveryBoyController],
})
export class DeliveryBoyModule {}
