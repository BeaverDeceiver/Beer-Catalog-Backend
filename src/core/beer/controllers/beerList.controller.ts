import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BeerQueryParamsDto } from '../dto/beerList-query-params.dto';
import { BeerService } from '../services/beerList.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class BeerListController {
  constructor(private readonly beerService: BeerService) {}

  @Get()
  async getBeerList(@Query() query: BeerQueryParamsDto) {
    return await this.beerService.getBeerList(query);
  }

  @Get('/beer/:id')
  async getSingleBeer(@Param('id') id: number) {
    return await this.beerService.getSingleBeer(id);
  }
}
