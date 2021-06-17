import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class BeerQueryParamsDto {
  @IsString()
  @IsOptional()
  beer_name?: string;

  @IsOptional()
  @IsNumber()
  @Transform((page) => Number(page))
  page?: number;

  @IsOptional()
  @IsNumber()
  @Transform((per_page) => Number(per_page))
  per_page?: number;

  @IsOptional()
  @IsNumber()
  @Transform((abv) => Number(abv))
  abv?: number;

  @IsOptional()
  @IsNumber()
  @Transform((ibu) => Number(ibu))
  ibu?: number;

  @IsOptional()
  @IsNumber()
  @Transform((ebc) => Number(ebc))
  ebc?: number;
}
