import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from './schema/pages.schema';
import { UpdatePagesDto } from './dto/update-pages.dto';

@Injectable()
export class PagesService {
  constructor(@InjectModel(Page.name) private readonly pageModel: Model<Page>) {}

  async findPageByName(pageName: string): Promise<Page> {
    return await this.pageModel.findOne({ pageType: pageName }).exec();
  }

  async updatePage(updatePageDto: UpdatePagesDto): Promise<Page> {
    const { pageType, title, description, status } = updatePageDto;

    const existingPage = await this.pageModel.findOne({ pageType }).exec();
    if (!existingPage) {
      throw new Error(`Page with type '${pageType}' not found`);
    }

    return await this.pageModel
      .findOneAndUpdate(
        { pageType },
        { $set: { title, description, status } },
        { new: true }
      )
      .exec();
  }
}
