import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegistrationService } from './services/registration.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User, UserInfo, UserToRole } from '../users/entities';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([User, UserInfo, Role, UserToRole]),
  ],
  controllers: [AuthController],
  providers: [AuthService, RegistrationService, LocalStrategy, JwtStrategy],
  exports: [AuthService, RegistrationService],
})
export class AuthModule {}
