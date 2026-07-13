import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class MovieDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  title!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear!: number;

  @IsArray()
  @IsUUID('4', { each: true })
  actorIds?: string[];
}
