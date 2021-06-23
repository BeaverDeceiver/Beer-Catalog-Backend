import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FavoriteBodyParamsDto {
  @IsNumber()
  @Transform((userId) => Number(userId))
  userId?: number;
}
