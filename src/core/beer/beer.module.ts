import { Module, HttpModule } from '@nestjs/common';
import { BeerListController } from './controllers/beerList.controller';
import { BeerService } from './services/beerList.service';

@Module({
  imports: [HttpModule],
  controllers: [BeerListController],
  providers: [BeerService],
  exports: [],
})
export class BeerModule {}
