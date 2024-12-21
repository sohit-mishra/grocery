import { NestExpressApplication } from '@nestjs/platform-express';
import { Environment, EnvironmentVariables } from '@core/configs/config';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '@core/services/auth.service';
import { ApiGuard } from '@core/guards/api.guard';
import { ErrorResponse } from '@core/filters/all-exception-filter';

function parseValidationErrors(errors: ValidationError[]): string[] {
  let messages: string[] = [];
  function parse(errors: ValidationError[]): void {
    errors.forEach(($error) => {
      if ($error.children && $error.children.length) {
        parse($error.children);
      } else {
        if ($error.constraints) {
          const errors: string[] = Object.values($error.constraints);
          messages = [...messages, ...errors];
        }
      }
    });
  }
  parse(errors);
  return messages;
}

// change default validation error response
const validationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  exceptionFactory: (validationErrors) => {
    const [validationError] = validationErrors;
    let constraints = [];
    constraints = parseValidationErrors(validationErrors);
    if (validationError.constraints) {
      constraints = Object.values(validationError.constraints as object);
    }
    const errorMessage: ErrorResponse = {
      message: constraints[0] || '',
      status: 400,
    };
    return new BadRequestException(errorMessage);
  },
});

export default function (
  app: NestExpressApplication,
  configService: ConfigService,
): void {
  const nodeEnv = configService.getOrThrow<string>(
    EnvironmentVariables.NODE_ENV,
  );
  const isDevelopment = nodeEnv === Environment.Development;

  if (!isDevelopment) {
    app.use(helmet());
  }

  app.enableCors({ origin: '*' });
  app.useGlobalPipes(validationPipe);

  const authService = app.get(AuthService);
  app.useGlobalGuards(new ApiGuard(authService));
}
