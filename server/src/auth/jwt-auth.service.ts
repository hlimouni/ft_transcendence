import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './dtos/jwt-payLoad.dto';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  signWith2FA(user, isAuthenticated = false) {
    const payload: JwtPayload = {
      id: user.id,
      isSecondFactorAuthenticated: isAuthenticated,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
