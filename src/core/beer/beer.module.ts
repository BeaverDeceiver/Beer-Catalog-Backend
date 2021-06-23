import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeerListController } from './controllers/beerList.controller';
import { Favorite } from './entities';
import { BeerService } from './services/beerList.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Favorite])],
  controllers: [BeerListController],
  providers: [BeerService],
  exports: [],
})
export class BeerModule {}
