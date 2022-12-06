import { Path } from 'react-router-dom';

import { PATH } from '@/common/constants/route';

type DeepestKeys<T> = T extends string
  ? never
  : {
      [K in keyof T & string]: T[K] extends string ? T[K] : DeepestKeys<T[K]>;
    }[keyof T & string];

export type To = DeepestKeys<typeof PATH> | Partial<Path>;
