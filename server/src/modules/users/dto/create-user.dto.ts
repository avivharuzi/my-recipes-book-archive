import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  // @ts-ignore
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  // @ts-ignore
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(255)
  // @ts-ignore
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // Can contain letters.
  // Can contain numbers.
  // Can container dash, dot and underscore.
  // There is no length validation (min, max) in this regex!
  @Matches(/^([a-z0-9]|[-._](?![-._])).*$/)
  // @ts-ignore
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  // Passwords will contain at least 1 upper case letter.
  // Passwords will contain at least 1 lower case letter.
  // Passwords will contain at least 1 number or special character.
  // There is no length validation (min, max) in this regex!
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  // @ts-ignore
  readonly password: string;
}
