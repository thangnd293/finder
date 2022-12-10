import { Navigate } from 'react-router-dom';

import useMediaQuery from '@/hooks/useMediaQuery';

import { RESPONSIVE } from '@/common/constants/responsive';
import { PATH } from '@/common/constants/route';

const Matches = () => {
  const isMobile = useMediaQuery({
    mediaQuery: `(max-width: ${RESPONSIVE.md}px)`,
  });

  if (!isMobile) {
    return <Navigate to={PATH.APP.HOME} />;
  }

  return <div>Matches</div>;
};

export default Matches;
