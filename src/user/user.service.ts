import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async isExitingEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }

  async create(createUserDto: CreateUserDto) {
    const isExitingEmail = await this.isExitingEmail(createUserDto.email);
    if (isExitingEmail) {
      throw new BadRequestException('Email already exists');
    }

    return await this.userRepository.save(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    // hash the password before insert
    return await this.userRepository.findOne({
      where: loginUserDto
    });
  }

  async findAll() {
    const [users, count] = await this.userRepository.findAndCount();
    return {
      rows: users.map((user) => ({
        ...user,
        password: undefined
      })),
      count
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException(`User with id, ${id}, not found`);
    }

    return {
      ...user,
      password: undefined
    };
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user, ${updateUserDto.email}`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
