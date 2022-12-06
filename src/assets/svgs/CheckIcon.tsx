import * as React from 'react';

import IconProps from '@/typings/icon';

const CheckIcon = (props: IconProps) => (
  <svg
    aria-hidden='false'
    viewBox='0 0 24 24'
    width={24}
    height={24}
    aria-labelledby='0aef5904e02602bf'
    fill='currentColor'
    {...props}
  >
    <path
      d='M21.33 4.783C20.883 4.223 20.212 4 19.542 4c-.67 0-1.34.224-1.788.783l-8.156 7.832-3.352-2.797c-.335-.56-1.006-.783-1.453-.783-.67 0-1.34.224-1.787.783-.783.56-1.006 1.12-1.006 1.679 0 .783.223 1.454.782 1.902l4.916 5.93c.559.447 1.118.671 1.9.671.67 0 1.117-.224 1.787-.783L21.218 8.14c.559-.448.782-1.119.782-1.79 0-.672-.223-1.343-.782-1.79l.112.223z'
      fillRule='evenodd'
    />
  </svg>
);

export default CheckIcon;
