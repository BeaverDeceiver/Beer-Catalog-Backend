import { Module } from '@nestjs/common';
import { BeerModule } from './core/beer/beer.module';

@Module({
  imports: [BeerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
