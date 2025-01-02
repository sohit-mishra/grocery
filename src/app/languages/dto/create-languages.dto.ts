import { IsString, IsBoolean } from 'class-validator';

export class CreateLanguagesDto {
  @IsBoolean()
  isDefault: boolean; 

  @IsString()
  languageCode: string;

  @IsString()
  languageName: string; 
}
