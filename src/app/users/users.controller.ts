import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserBody, CreateUserResponse } from './dto/admin-create.dto';
import { LoginUserBody, LoginUserResponse } from './dto/login-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create/user')
  async createSuperAdmin(
    @Body() body: CreateUserBody,
  ): Promise<CreateUserResponse> {
    return await this.usersService.createUser(body);
  }

  @Post('/login')
  async loginUser(@Body() body: LoginUserBody): Promise<LoginUserResponse> {
    return await this.usersService.loginUser(body);
  }
}
