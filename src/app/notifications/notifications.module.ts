import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Notifications_Model, NotificationsSchema } from './notifications.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notifications_Model, schema: NotificationsSchema },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
