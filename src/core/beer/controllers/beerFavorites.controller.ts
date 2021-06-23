import {
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HasAccessGuard } from 'src/common/guards/has-access.guard';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { FavoritesService } from '../services/favorites.service';

@Controller('/favorites')
@UseGuards(JwtAuthGuard, HasAccessGuard)
export class BeerFavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('/:id')
  async addFavorite(
    @Headers('authorization') header: string,
    @Param('id') beerId: number,
  ) {
    return await this.favoritesService.addFavorite(beerId, header);
  }

  @Delete('/:id')
  async removeFavorite(
    @Headers('authorization') header: string,
    @Param('id') beerId: number,
  ) {
    return await this.favoritesService.removeFavorite(beerId, header);
  }

  @Get()
  async getFavoritesList(@Headers('authorization') header: string) {
    return await this.favoritesService.getUserFavorites(header);
  }
}
