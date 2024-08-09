import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from '@nestjs/common';

@Injectable()
export class IdValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const numValue = Number(value);

    if (isNaN(numValue)) {
      throw new BadRequestException(
        'Validation failed: numeric string required'
      );
    }

    if (numValue < 1) {
      throw new BadRequestException(
        'Validation failed: positive number required'
      );
    }

    return numValue;
  }
}
