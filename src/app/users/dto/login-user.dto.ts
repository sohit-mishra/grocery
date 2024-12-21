import { IsNotEmpty, IsString } from 'class-validator';
import { Role, UploadImage } from '../users.model';

export class LoginUserBody {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsNotEmpty()
  // @IsString()
  // @IsEnum(ROLE)
  // role: Role;
}

export class LoginUserResponse {
  id: string;
  message: string;
  accessToken: string;
  role: Role;
  isEmailVerified: boolean;
  firstName: string;
  lastName: string;
  profilePicture: UploadImage;
}
