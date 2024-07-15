import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  HttpCode
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('/api/v1/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @Post('/registration')
  async create(@Body() createUserDto: CreateUserDto) {
    const userCreated = await this.userService.create(createUserDto);
    if (!userCreated) {
      return {
        message: 'Could not create user',
        status: false
      };
    }

    return {
      success: true,
      message: 'User created successfully, please login'
    };
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.login(loginUserDto);
    if (!user) {
      return {
        status: false,
        message: 'Invalid credentials, please try again'
      };
    }

    return {
      success: true,
      message: 'User login successful',
      data: user
    };
  }

  @Get('/users')
  async findAll() {
    const data = await this.userService.findAll();

    return {
      success: true,
      data
    };
  }

  @Get('/users/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
