import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
<<<<<<< HEAD
<<<<<<< HEAD
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
=======
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
>>>>>>> 70c37cc (reimplement the login and sign up, hashing the user password and generating jwt)
=======
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
>>>>>>> ad474b1 (add update user)
import { UserUtil } from './user.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userUtil: UserUtil
  ) {}

  private async isExitingEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id']
    });
    return !!user;
  }

  async create(createUserDto: CreateUserDto) {
    const isExitingEmail = await this.isExitingEmail(createUserDto.email);
    if (isExitingEmail) {
      throw new BadRequestException('Email already exists');
    }

    createUserDto.email = createUserDto.email.toLowerCase();
    createUserDto.password = await this.userUtil.hashPassword(
      createUserDto.password
    );

    return await this.userRepository.save(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'password', 'email', 'username', 'createAt', 'updatedAt']
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isAuthentic = await this.userUtil.comparePassword(
      loginUserDto.password,
      user.password
    );
    if (!isAuthentic) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = await this.userUtil.generateJwt(user);

    delete user.password;
    return { ...user, token };
  }

  async findAll() {
    const [users, count] = await this.userRepository.findAndCount();
    return {
      rows: users.map((user) => user.toSafe()),
      count
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: { password: false }
    });
    if (!user) {
      throw new BadRequestException(`User with id, ${id}, not found`);
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user, ${updateUserDto.email}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
