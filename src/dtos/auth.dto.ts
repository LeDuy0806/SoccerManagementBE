import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class RefreshTokenDto {
  @IsString()
  public refreshToken: string;
}
