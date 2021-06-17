import { Controller, Get, Param, Query } from '@nestjs/common';
import { BeerQueryParamsDto } from '../dto/beerList-query-params.dto';
import { BeerService } from '../services/beerList.service';

@Controller()
export class BeerListController {
  constructor(private readonly appService: BeerService) {}

  @Get()
  async getBeerList(@Query() query: BeerQueryParamsDto) {
    return await this.appService.getBeerList(query);
  }

  @Get('/beer/:id')
  async getSingleBeer(@Param('id') id: number) {
    return await this.appService.getSingleBeer(id);
  }
}
