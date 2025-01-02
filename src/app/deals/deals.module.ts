import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { Deals, DealsSchema } from './schema/deals.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deals.name, schema: DealsSchema }]),
  ],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
