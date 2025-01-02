import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsObject,
} from 'class-validator';

export class CreateBussinessDto {
  @IsString()
  @IsNotEmpty()
  storeName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  officeLocation: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  address?:string;
}
