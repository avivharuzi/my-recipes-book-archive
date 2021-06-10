// @ts-nocheck

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  @Matches(/^([a-z0-9]|[-._](?![-._])).*$/)
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  readonly password: string;
}
