import { IsOptional, IsNumberString } from 'class-validator';
import { Chat } from '../chat.model';

export class AllChatsQuery {
  @IsOptional()
  @IsNumberString()
  page: string;

  @IsOptional()
  @IsNumberString()
  limit: string;
}

export class AllChatsResponse {
  response_code: number;
  response_data: Chat[];
}
