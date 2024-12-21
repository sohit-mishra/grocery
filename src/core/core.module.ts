import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOptions } from './configs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exception-filter';
import { MongooseModule } from '@nestjs/mongoose';
import { dbOptions } from './database/db.config';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './configs/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import jwtOptions from './configs/jwt.config';
import { SuccessResponseInterceptor } from './interceptors/success-response.interceptor';
import { StorageService } from './services/storage.service';
import { UsersModule } from '@app/users/users.module';
@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(jwtOptions),
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync(dbOptions),
    UsersModule,
  ],
  providers: [
    Logger,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessResponseInterceptor,
    },
    AuthService,
    JwtStrategy,
    StorageService,
  ],
  exports: [
    AuthService,
    JwtStrategy,
    PassportModule,
    JwtModule,
    StorageService,
  ],
})
export class CoreModule {}
