import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSubscriptionsDto {
  @IsInt()
  @Min(1) 
  subscriptionCount: number;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}
