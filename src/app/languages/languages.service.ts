import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Languages } from './schema/languages.schema';
import { CreateLanguagesDto } from './dto/create-languages.dto';
import { UpdateLanguagesDto } from './dto/update-languages.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class LanguagesService {
  private readonly logger = new Logger(LanguagesService.name);

  constructor(
    @InjectModel(Languages.name) private readonly languagesModel: Model<Languages>,
  ) {}

  async findAll(): Promise<{ data: Languages[] }> {
    const languages = await this.languagesModel.find().exec();
    return { data: languages };
  }

  async findDefault(): Promise<Languages> {
    const defaultLanguage = await this.languagesModel.findOne({ isDefault: true }).exec();
    if (!defaultLanguage) {
      throw new NotFoundException('Default language not found');
    }
    return defaultLanguage;
  }

  async findOne(id: string): Promise<Languages> {
    const language = await this.languagesModel.findById(id).exec();
    if (!language) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
    return language;
  }

  async create(createLanguagesDto: CreateLanguagesDto): Promise<Languages> {
    const newLanguage = new this.languagesModel(createLanguagesDto);
    return await newLanguage.save();
  }

  async update(id: string, updateLanguagesDto: UpdateLanguagesDto): Promise<Languages> {
    const updatedLanguage = await this.languagesModel
      .findByIdAndUpdate(id, updateLanguagesDto, { new: true })
      .exec();
    if (!updatedLanguage) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
    return updatedLanguage;
  }

  async updateStatus(id: string, isActive: boolean): Promise<Languages> {
    const updatedLanguage = await this.languagesModel
      .findByIdAndUpdate(id, { isActive }, { new: true })
      .exec();
    if (!updatedLanguage) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
    return updatedLanguage;
  }

  async remove(id: string): Promise<Languages> {
    const deletedLanguage = await this.languagesModel.findByIdAndDelete(id).exec();
    if (!deletedLanguage) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
    return deletedLanguage;
  }
}
