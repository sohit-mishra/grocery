import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';
import { COUPONS_MODEL, CouponsSchema } from './coupons.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: COUPONS_MODEL, schema: CouponsSchema }]),
  ],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
