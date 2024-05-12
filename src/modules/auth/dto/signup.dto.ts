import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';

export class SignUpTdo {
  // Attributs
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
