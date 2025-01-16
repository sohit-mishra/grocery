import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class ReadNotificationsBody {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  notificationId: string;
}

export class ReadNotificationsResponse {
  response_code: number;
  response_data: any;
}
