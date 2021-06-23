import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeerFavoritesController } from './controllers/beerFavorites.controller';
import { BeerListController } from './controllers/beerList.controller';
import { Favorite } from './entities';
import { BeerService } from './services/beerList.service';
import { FavoritesService } from './services/favorites.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Favorite])],
  controllers: [BeerListController, BeerFavoritesController],
  providers: [BeerService, FavoritesService],
  exports: [],
})
export class BeerModule {}
