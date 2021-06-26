import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

import { passwordRegex } from '../../shared/password-regex';
import { userNameRegex } from '../../shared/user-name-regex';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly firstName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly lastName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @IsEmail()
  readonly email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  @Matches(userNameRegex)
  readonly userName!: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(passwordRegex)
  readonly password!: string;
}
