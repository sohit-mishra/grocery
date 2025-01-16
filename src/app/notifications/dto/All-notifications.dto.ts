import { IsOptional, IsInt, Min } from 'class-validator';
import { Notifications } from '../notifications.model';

export class AllNotificationsQuery {
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number;
}

export class AllNotificationsResponse {
  response_code: number;
  response_data: Notifications[];
  total: number;
}
