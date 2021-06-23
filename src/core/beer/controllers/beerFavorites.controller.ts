import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoriteBodyParamsDto } from '../dto/favorites-query-params.dto';
import { FavoritesService } from '../services/favorites.service';

@Controller('/favorites')
export class BeerFavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('/:id')
  async addFavorite(
    @Body() body: FavoriteBodyParamsDto,
    @Param('id') beerId: number,
  ) {
    return await this.favoritesService.addFavorite(beerId, body.userId);
  }

  @Delete('/:id')
  async removeFavorite(
    @Body() body: FavoriteBodyParamsDto,
    @Param('id') beerId: number,
  ) {
    return await this.favoritesService.removeFavorite(beerId, body.userId);
  }

  @Get()
  async getFavoritesList(@Body() body: FavoriteBodyParamsDto) {
    return await this.favoritesService.getUserFavorites(body.userId);
  }
}
