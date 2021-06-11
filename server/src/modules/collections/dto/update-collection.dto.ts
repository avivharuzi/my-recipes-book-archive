// @ts-nocheck

import { IsArray, IsNotEmpty } from 'class-validator';

import { CreateCollectionDto } from './create-collection.dto';

export class UpdateCollectionDto extends CreateCollectionDto {
  @IsNotEmpty()
  @IsArray()
  readonly recipes: string[];
}
