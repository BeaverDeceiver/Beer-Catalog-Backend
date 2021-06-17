import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsString, IsIn } from 'class-validator';

export class RolesQueryParamsDto {
  @IsOptional()
  @IsNumber()
  @Transform((limit) => Number(limit))
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Transform((offset) => Number(offset))
  offset?: number;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  sortDirection?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Transform((permissionMask) => Number(permissionMask))
  permissionMask?: number;

  @IsOptional()
  @IsString()
  url?: string;
}
