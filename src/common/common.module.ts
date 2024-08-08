import { Global, Module } from '@nestjs/common';
import { AppConstant } from './constants/app.constant';

@Global()
@Module({
  providers: [AppConstant],
  exports: [AppConstant]
})
export class CommonModule {}
