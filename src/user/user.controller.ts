import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
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
    return this.userService.login(loginUserDto);
  }

  @Get('/users')
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/users/:id')
  findOne(
    @Param('id', /* ParseIntPipe, */ /* new IdValidation() */ IdValidation)
    id: number
  ) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
