import { Global, Module } from '@nestjs/common';
import { AppConstant } from './constants/app.constant';
import { IdValidation } from './validation';

@Global()
@Module({
  providers: [AppConstant, IdValidation],
  exports: [AppConstant, IdValidation]
})
export class CommonModule {}
