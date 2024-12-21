import { AuthService } from '@core/services/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { headers } = request;
    const apiKey = headers['x-api-key'] as string;
    return this.authService.validateApiToken(apiKey);
  }
}
