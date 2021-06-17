import { Module } from '@nestjs/common';
import { BeerModule } from './core/beer/beer.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './core/users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [BeerModule, AuthModule, UsersModule, DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
