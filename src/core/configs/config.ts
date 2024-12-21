import { ConfigModuleOptions } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  validate,
};

export enum Environment {
  Development = 'development',

  Testing = 'testing',
  Production = 'production',
  Local = 'local',
}

export enum EnvironmentVariables {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
  MONGO_URL = 'MONGO_URL',
  JWT_SECRET = 'JWT_SECRET',
  API_TOKEN = 'API_TOKEN',
  CMS_URL = 'CMS_URL',
  APP_URL = 'APP_URL',
}

export class EnvironmentVariable {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  MONGO_URL: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  API_TOKEN: string;
}

export function validate(config: Record<string, unknown>): EnvironmentVariable {
  const validatedConfig = plainToInstance(EnvironmentVariable, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
