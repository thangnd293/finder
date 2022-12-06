import * as React from 'react';

import IconProps from '@/typings/icon';

const SendingIcon = (props: IconProps) => (
  <svg
    height={12}
    viewBox='2 2 20 20'
    width={12}
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path d='M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18.5a8.5 8.5 0 1 1 8.5-8.5 8.51 8.51 0 0 1-8.5 8.5z' />
  </svg>
);

export default SendingIcon;
