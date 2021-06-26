// @ts-nocheck

import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateRecipesFromCollectionDto {
  @IsNotEmpty()
  @IsArray()
  readonly recipes: string[];
}
