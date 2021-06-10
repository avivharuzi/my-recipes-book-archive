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
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @IsArray()
  ingredients: string[];

  @IsNotEmpty()
  @IsArray()
  directions: string[];

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  preparationTime: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  cookingTime: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  servingsAmount: number;
}
