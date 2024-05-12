import { ArgumentMetadata, ParseEnumPipe } from '@nestjs/common';

export class OptionalParseEnumPipe<T = any> extends ParseEnumPipe {
  async transform(value: T, metadata: ArgumentMetadata): Promise<string> {
    if (typeof value === 'undefined') {
      return undefined;
    }

    return await super.transform(value, metadata);
  }
}
