import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { envConfig } from '@setup';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfig.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.id, username: payload.username };
  }
}
