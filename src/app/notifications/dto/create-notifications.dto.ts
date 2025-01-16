import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNotificationsBody {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}

export class CreateNotificationsResponse {
  response_code: number;
  response_data: string;
}
