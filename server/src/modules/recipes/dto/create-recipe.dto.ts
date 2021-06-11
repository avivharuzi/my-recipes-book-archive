// @ts-nocheck

import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly description: string;

  @IsNotEmpty()
  @IsArray()
  readonly ingredients: string[];

  @IsNotEmpty()
  @IsArray()
  readonly directions: string[];

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly preparationTime: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly cookingTime: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly servingsAmount: number;
}
