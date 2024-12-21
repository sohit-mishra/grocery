import { Role } from '@app/users/users.model';
import { LoggedInUser } from '@core/configs/jwt.strategy';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly accessTokenExpiration = 30 * 86400; // 30 days
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  validateApiToken(apiKey: string): boolean {
    const apiToken = this.configService.getOrThrow<string>('API_TOKEN');
    if (!apiKey || String(apiToken) !== String(apiKey)) {
      throw new ForbiddenException();
    }
    return true;
  }

  validateRoles(user: LoggedInUser, roles: Role[]): boolean {
    if (!roles.includes(user.role)) {
      throw new ForbiddenException('Access Deined');
    }
    return true;
  }

  compareHash(data: string, hash: string): boolean {
    return compareSync(data, hash);
  }

  private generateSalt(): Promise<string> {
    return genSalt(10);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await this.generateSalt();
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }

  public generateAccessToken(payload: { id: string; role: Role }): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.accessTokenExpiration,
    });
  }
}
