import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { USER_MODEL, UserSchema } from './users.model';
import { UsersRepo } from './users.repo';
import { AuthService } from '@core/services/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_MODEL, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepo, AuthService],
  exports: [UsersRepo, UsersService],
})
export class UsersModule {}
