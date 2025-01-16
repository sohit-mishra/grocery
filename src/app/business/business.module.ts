import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { Business_Model, BusinessSchema } from './business.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Business_Model, schema: BusinessSchema }]),
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
