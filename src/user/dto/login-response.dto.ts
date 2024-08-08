import { Exclude, Expose } from 'class-transformer';

export class LoginResponseDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  token: string;

  @Expose()
  message = 'User login successful';

  @Exclude()
  password: string;

  constructor(partial: object) {
    Object.assign(this, partial);
  }
}
