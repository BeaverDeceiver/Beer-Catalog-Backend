import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbconfig } from '../configs/db.config';

@Module({
  imports: [TypeOrmModule.forRoot(dbconfig)],
})
export class DatabaseModule {}
