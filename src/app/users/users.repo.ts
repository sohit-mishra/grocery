import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { USER_MODEL, User, UserDocument } from './users.model';
import { CreateUserInput } from './dto/admin-create.dto';

@Injectable()
export class UsersRepo {
  constructor(
    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(userInput: CreateUserInput): Promise<User> {
    return await this.userModel.create(userInput);
  }

  async getUserByEmailAndRole(
    email: string,
    role?: string,
  ): Promise<User | null> {
    const dbQuery = { email: email };
    if (role) dbQuery['role'] = role;
    const user = await this.userModel.findOne(dbQuery).lean(true);
    return user;
  }

  async getUser(query: Partial<User>): Promise<User | null> {
    return await this.userModel.findOne(query).lean(true);
  }

  async updateUser(
    id: string,
    update: Partial<Omit<User, '_id'>>,
  ): Promise<User | null> {
    return await this.userModel
      .findOneAndUpdate(
        { _id: new Types.ObjectId(id) },
        { $set: update },
        { new: true },
      )
      .lean(true);
  }
}
