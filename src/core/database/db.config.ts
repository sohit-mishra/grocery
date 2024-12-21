import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleAsyncOptions,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { Environment, EnvironmentVariables } from '../configs/config';
import mongoose from 'mongoose';

export const dbOptions: MongooseModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    const uri = configService.getOrThrow<string>(
      EnvironmentVariables.MONGO_URL,
    );
    const nodeEnv = configService.getOrThrow<string>(
      EnvironmentVariables.NODE_ENV,
    );
    const options: MongooseModuleOptions = { uri };
    if (nodeEnv == Environment.Development) {
      mongoose.set('debug', true);
    }
    return options;
  },
};
