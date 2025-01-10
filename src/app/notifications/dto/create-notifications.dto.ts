import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNotificationsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}
