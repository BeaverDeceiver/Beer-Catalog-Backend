import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { EndpointsController } from './controllers/endpoints.controller';
import { UsersService } from './services/users.service';
import { EndpointsService } from './services/endpoints.service';
import {
  User,
  UserInfo,
  Role,
  EndpointToRole,
  UserToRole,
  Endpoint,
} from './entities';
import { UsersSubscriber } from './subscribers/users.subscriber';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserInfo,
      Role,
      Endpoint,
      EndpointToRole,
      UserToRole,
    ]),
  ],
  controllers: [UsersController, EndpointsController, RolesController],
  providers: [UsersService, UsersSubscriber, RolesService, EndpointsService],
  exports: [UsersService, RolesService, EndpointsService],
})
export class UsersModule {}
