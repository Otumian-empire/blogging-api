import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
<<<<<<< HEAD
<<<<<<< HEAD
  ParseIntPipe,
=======
>>>>>>> ad474b1 (add update user)
=======
  ParseIntPipe,
>>>>>>> 560c792 (submain)
  Patch,
  Post,
  UseInterceptors
} from '@nestjs/common';
<<<<<<< HEAD
import { IdValidation } from 'src/common/validation';
=======
>>>>>>> ad474b1 (add update user)
import {
  CreateUserDto,
  LoginResponseDto,
  LoginUserDto,
  UpdateUserDto
} from './dto';
import { UserService } from './user.service';
import { IdValidation } from 'src/common/validation';

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
  }

  @Get('/users')
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/users/:id')
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 560c792 (submain)
  findOne(
    @Param('id', /* ParseIntPipe, */ /* new IdValidation() */ IdValidation)
    id: number
  ) {
<<<<<<< HEAD
=======
  findOne(@Param('id') id: number) {
>>>>>>> ad474b1 (add update user)
=======
>>>>>>> 560c792 (submain)
    return this.userService.findOne(id);
  }

  @Patch(':id')
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 560c792 (submain)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
<<<<<<< HEAD
=======
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
>>>>>>> ad474b1 (add update user)
=======
>>>>>>> 560c792 (submain)
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
