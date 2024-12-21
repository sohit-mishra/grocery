import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@core/configs/config';
import { Role } from '@app/users/users.model';
import { UsersRepo } from '@app/users/users.repo';

export class LoggedInUser {
  id: string;
  role: Role;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    readonly configService: ConfigService,
    readonly usersRepo: UsersRepo,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(EnvironmentVariables.JWT_SECRET),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, user: LoggedInUser): Promise<LoggedInUser> {
    const getUser = await this.usersRepo.getUser({
      _id: new Types.ObjectId(user.id),
    });
    if (!getUser) {
      throw new ForbiddenException('User Account not found');
    }
    return user;
  }
}
