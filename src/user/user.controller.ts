import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  // Patch,
  Param,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { CreateUserDto, LoginResponseDto, LoginUserDto } from './dto';
import { UserService } from './user.service';

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

  @UseInterceptors(LoginResponseDto)
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
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
