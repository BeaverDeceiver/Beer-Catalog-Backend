import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { getBeerListURL, getSingleBeerURL } from '../utils/URL';
import { IBeerQueryParams } from '../interfaces/beerList-query-params.interface';

@Injectable()
export class BeerService {
  constructor(private http: HttpService) {}

  async getBeerList(query: IBeerQueryParams) {
    return this.http
      .get(getBeerListURL(query).toString())
      .pipe(map((response) => response.data));
  }

  async getSingleBeer(id: number) {
    return this.http
      .get(getSingleBeerURL(id))
      .pipe(map((response) => response.data));
  }
}
