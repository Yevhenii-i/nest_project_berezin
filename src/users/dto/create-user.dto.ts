// src/users/dto/create-user.dto.ts
import { IsEmail, IsString} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string; // hashed in AuthService
}
