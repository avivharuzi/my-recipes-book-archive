// @ts-nocheck

import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly lastName: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly profileImage?: string;
}
