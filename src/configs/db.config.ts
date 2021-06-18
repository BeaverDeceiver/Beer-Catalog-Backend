import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  entities: [],
  autoLoadEntities: true,
  synchronize: false,
  url: process.env.DATABASE_URL,
  extra: { ssl: { rejectUnauthorized: false } },
};

export { dbconfig };
