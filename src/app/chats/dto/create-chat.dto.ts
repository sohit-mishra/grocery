import { IsString, IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  sentBy: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class CreateChatsResponse {
  response_code: number;
  response_data: string;
}
