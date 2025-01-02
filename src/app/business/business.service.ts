import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Business } from './schema/business.schema';
import { Model } from 'mongoose';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name) private readonly businessModel: Model<Business>,
  ) {}

  async findAll(): Promise<Business[]> {
    const data = await this.businessModel.find().exec();
    return data;
  }

  async updateOne(updateBusinessDto: UpdateBusinessDto): Promise<Business> {
    const { storeName, email, officeLocation, phoneNumber, address } = updateBusinessDto;
    const updatedBusiness = await this.businessModel.findOneAndReplace(
      { email },
      {
        $set: {
          storeName,
          email,
          officeLocation,
          phoneNumber,
          address,
        },
      },
      { new: true },
    ).exec();

    if (!updatedBusiness) {
      throw new Error('Business not found or unable to update');
    }

    return updatedBusiness;
  }
}
