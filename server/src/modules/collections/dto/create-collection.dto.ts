// @ts-nocheck

import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCollectionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
