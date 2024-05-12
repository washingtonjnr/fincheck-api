import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEYS = {
  IS_PUBLIC: 'IS_PUBLIC',
};

export const IsPublic = () => {
  return SetMetadata(PUBLIC_KEYS.IS_PUBLIC, true);
};
