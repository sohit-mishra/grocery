import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';
import { Coupons, CouponsSchema } from './schema/coupons.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coupons.name, schema: CouponsSchema }]),
  ],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
