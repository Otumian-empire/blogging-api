import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConstant {
  readonly salt = 10;
}
