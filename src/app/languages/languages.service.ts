import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
  Param,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Languages } from './schema/languages.schema';
import {
  CreateLanguagesBody,
  CreateLanguagesResponse,
} from './dto/create-languages.dto';
import {
  UpdateLanguagesBody,
  UpdateLanguagesParam,
  UpdateLanguagesResponse,
} from './dto/update-languages.dto';
import { AllLanguagesResponse } from './dto/all-languages.dto';
import { DefaultLanguagesParam, DefaultLanguagesResponse } from './dto/default-language.dto';
import { OneLanguagesParam, OneLanguagesResponse } from './dto/one-languages.dto';
import {
  StatusUpdateLanguagesBody,
  StatusUpdateLanguagesParam,
  StatusUpdateLanguagesResponse,
} from './dto/status-language.dto';
import {
  DeleteLanguagesParam,
  DeleteLanguagesResponse,
} from './dto/delete-language.dto';

@Injectable()
export class LanguagesService {
  private readonly logger = new Logger(LanguagesService.name);

  constructor(
    @InjectModel(Languages.name)
    private readonly languagesModel: Model<Languages>,
  ) {}

  async findAll(): Promise<AllLanguagesResponse> {
    const languages = await this.languagesModel
      .find()
      .select('-createdAt -updatedAt -__v')
      .exec();
    const response: AllLanguagesResponse = {
      response_code: 200,
      response_data: languages,
    };
    return response;
  }

  async findDefault(param: DefaultLanguagesParam): Promise<DefaultLanguagesResponse> {
    const {id} = param;
    const defaultLanguage = await this.languagesModel
      .findOne({ _id: id, isDefault: true })
      .exec();
    if (!defaultLanguage) {
      throw new NotFoundException('Default language not found');
    }
    const response: DefaultLanguagesResponse = {
      response_code: 200,
      response_data: 'Language details updated succesfully',
    };
    return response;
  }

  async findOne(param : OneLanguagesParam): Promise<OneLanguagesResponse> {
    const {id}= param;
    const language = await this.languagesModel.findById(id).exec();
    if (!language) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
    const response: OneLanguagesResponse = {
      response_code: 200,
      response_data: language,
    };
    return response;
  }

  async create(
    createLanguagesDto: CreateLanguagesBody,
  ): Promise<CreateLanguagesResponse> {
    const newLanguage = new this.languagesModel(createLanguagesDto);
    await newLanguage.save();
    const response: CreateLanguagesResponse = {
      response_code: 200,
      response_data: 'Language Saved Successfully',
    };
    return response;
  }

  async update(
    param: UpdateLanguagesParam,
    updateLanguagesDto: UpdateLanguagesBody,
  ): Promise<UpdateLanguagesResponse> {
    const { id } = param;
    const updatedLanguage = await this.languagesModel
      .findByIdAndUpdate(id, updateLanguagesDto, { new: true })
      .exec();
    if (!updatedLanguage) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
    const response: UpdateLanguagesResponse = {
      response_code: 200,
      response_data: 'Language Updated Successfully',
    };
    return response;
  }

  async updateStatus(
    param: StatusUpdateLanguagesParam,
    update: StatusUpdateLanguagesBody,
  ): Promise<StatusUpdateLanguagesResponse> {
    const { id } = param;
    const { isActive } = update;
    const updatedLanguage = await this.languagesModel
      .findByIdAndUpdate(id, { isActive }, { new: true })
      .exec();
    if (!updatedLanguage) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
    const response: StatusUpdateLanguagesResponse = {
      response_code: 200,
      response_data: 'Language Status Updated Successfully',
    };
    return response;
  }

  async remove(param: DeleteLanguagesParam): Promise<DeleteLanguagesResponse> {
    const { id } = param;
    const deletedLanguage = await this.languagesModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedLanguage) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
    const response: DeleteLanguagesResponse = {
      response_code: 200,
      response_data: 'Language Deleted Successfully',
    };
    return response;
  }
}
