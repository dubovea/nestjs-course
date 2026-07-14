import {
  IsArray,
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  MaxLength,
  Min,
  IsBoolean,
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
  @ArrayNotEmpty()
  actorIds!: string[];

  @IsOptional()
  @IsUrl()
  posterUrl?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
