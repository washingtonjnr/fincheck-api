import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';

export class OptionalParseUUIDPipe extends ParseUUIDPipe {
  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    if (typeof value === 'undefined') {
      return undefined;
    }

    return await super.transform(value, metadata);
  }
}
