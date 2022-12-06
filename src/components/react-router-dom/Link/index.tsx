import { Link as LinkReact } from 'react-router-dom';

import { To } from '@/typings/react-router-dom';

export const Link = ({
  children,
  ...rest
}: Omit<React.ComponentProps<typeof LinkReact>, 'to'> & { to: To }) => {
  return <LinkReact {...rest}>{children}</LinkReact>;
};
