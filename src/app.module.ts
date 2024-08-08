import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { Blog, User } from './entities/';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'blogging-api-db.db',
      synchronize: true,
      entities: [Blog, User]
    }),
    BlogModule,
    UserModule,
    CommonModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
