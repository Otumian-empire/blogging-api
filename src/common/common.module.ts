import { Global, Module } from '@nestjs/common';
import { AppConstant } from './constants/app.constant';
<<<<<<< HEAD
<<<<<<< HEAD
import { IdValidation } from './validation';

@Global()
@Module({
  providers: [AppConstant, IdValidation],
  exports: [AppConstant, IdValidation]
=======

@Global()
@Module({
  providers: [AppConstant],
  exports: [AppConstant]
>>>>>>> 9deef2e (add a common module)
=======
import { IdValidation } from './validation';

@Global()
@Module({
  providers: [AppConstant, IdValidation],
  exports: [AppConstant, IdValidation]
>>>>>>> 560c792 (submain)
})
export class CommonModule {}
