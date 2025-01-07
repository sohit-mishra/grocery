import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

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
