import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryTaxController } from './delivery-tax.controller';
import { DeliveryTaxService } from './delivery-tax.service';
import { DeliveryTax, DeliveryTaxSchema } from './schema/deliverytax.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DeliveryTax.name, schema: DeliveryTaxSchema }]),
  ],
  controllers: [DeliveryTaxController],
  providers: [DeliveryTaxService],
})
export class DeliveryTaxModule {}
