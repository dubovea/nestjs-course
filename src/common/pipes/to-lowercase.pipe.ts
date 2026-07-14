import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class StringToLowerCase implements PipeTransform<unknown, unknown> {
  transform(value: unknown, _metadata: ArgumentMetadata): unknown {
    return typeof value === 'string' ? value.toLowerCase() : value;
  }
}
