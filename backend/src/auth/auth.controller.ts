import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthUser } from './types/auth-user.types';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(
    @Req() req: Request & { user: AuthUser },
    @Res() res: Response,
  ) {
    const result = this.authService.login(req.user);

    const token = result.access_token;

    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    return res.redirect(`${frontendUrl}?token=${token}`);
  }
}
