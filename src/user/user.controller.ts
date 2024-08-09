import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
<<<<<<< HEAD
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors
} from '@nestjs/common';
import {
  CreateUserDto,
  LoginResponseDto,
  LoginUserDto,
  UpdateUserDto
} from './dto';
=======
  // Patch,
  Param,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { CreateUserDto, LoginResponseDto, LoginUserDto } from './dto';
>>>>>>> 70c37cc (reimplement the login and sign up, hashing the user password and generating jwt)
import { UserService } from './user.service';

@Controller('/api/v1/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
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
<<<<<<< HEAD
  @HttpCode(HttpStatus.OK)
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
=======
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
>>>>>>> 70c37cc (reimplement the login and sign up, hashing the user password and generating jwt)
  }

  @Get('/users')
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/users/:id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
