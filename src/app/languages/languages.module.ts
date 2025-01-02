import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Languages, LanguagesSchema } from './schema/languages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Languages.name, schema: LanguagesSchema }]),
  ],
  providers: [LanguagesService],
  controllers: [LanguagesController],
})
export class LanguagesModule {}
