// @ts-nocheck

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly password: string;
}
