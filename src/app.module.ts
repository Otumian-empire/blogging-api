import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'blogging-api-db.db',
      synchronize: true,
      entities: [Blog, User]
    }),
    BlogModule,
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
