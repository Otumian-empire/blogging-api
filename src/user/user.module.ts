import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserUtil } from './user.utils';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  controllers: [UserController],
  providers: [UserService, UserUtil, JwtService]
})
export class UserModule {}
