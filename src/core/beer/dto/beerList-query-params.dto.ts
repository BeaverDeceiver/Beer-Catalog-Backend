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
  @Transform((abv_gt) => Number(abv_gt))
  abv_gt?: number;

  @IsOptional()
  @IsNumber()
  @Transform((ibu_gt) => Number(ibu_gt))
  ibu_gt?: number;

  @IsOptional()
  @IsNumber()
  @Transform((ebc_gt) => Number(ebc_gt))
  ebc_gt?: number;
}
