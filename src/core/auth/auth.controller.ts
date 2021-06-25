import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './services/auth.service';
import { RegistrationService } from './services/registration.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private registrationService: RegistrationService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async login(@Request() req) {
    return this.authService.login(req.user, req.body.stayLoggedIn);
  }

  @Post('/signup')
  async signUp(@Body() body) {
    return this.registrationService.signUp(body);
  }

  @Post('/refresh')
  async refresh(@Body() body) {
    return this.authService.refresh(body.refreshToken);
  }
}
