// @ts-nocheck

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly password: string;
}
