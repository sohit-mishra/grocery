import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNotificationsDto {
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
