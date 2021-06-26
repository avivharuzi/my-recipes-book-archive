import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCollectionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  readonly name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly description?: string;
}
