import { IsBoolean, IsString, IsNotEmpty } from 'class-validator';

export class CreatePagesDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  status: boolean;

  @IsString()
  @IsNotEmpty()
  pageType: string;
}
