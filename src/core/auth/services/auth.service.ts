import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from '../../../common/helpers/hash';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = (
      await this.usersService.get({
        select: ['id', 'email', 'password'],
        where: { email },
      })
    )[0];

    if (user && compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any, stayLoggedIn: boolean) {
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload = {
      id: user.id,
      email: user.email,
      stayLoggedIn: stayLoggedIn,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: stayLoggedIn
        ? process.env.REFRESH_TOKEN_EXPIRED_SLI
        : process.env.REFRESH_TOKEN_EXPIRED,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  refresh(refreshToken: string) {
    if (refreshToken) {
      let payload;

      try {
        payload = this.jwtService.verify(refreshToken, {
          secret: process.env.REFRESH_TOKEN_SECRET,
        });
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          throw new UnauthorizedException('Refresh token expired');
        }
      }

      const newPayload = {
        id: payload.id,
        email: payload.email,
        stayLoggedIn: payload.stayLoggedIn,
      };

      const newAccessToken = this.jwtService.sign(newPayload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
      });
      const newRefreshToken = this.jwtService.sign(newPayload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: payload.stayLoggedIn
          ? process.env.REFRESH_TOKEN_EXPIRED_SLI
          : process.env.REFRESH_TOKEN_EXPIRED,
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    }

    throw new BadRequestException('No refresh token');
  }
}
