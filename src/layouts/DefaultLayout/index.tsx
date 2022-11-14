import { Outlet } from 'react-router-dom';

import ControlPanel from '../ControlPanel';

import useMediaQuery from '@/hooks/useMediaQuery';

import { RESPONSIVE } from '@/common/constants/responsive';

const DefaultLayout = () => {
  const isMobile = useMediaQuery({
    mediaQuery: `(max-width: ${RESPONSIVE.md}px)`,
  });

  return (
    <div className='flex w-full h-screen'>
      {!isMobile && (
        <ControlPanel className='flex flex-col basis-1/4 min-w-control-panel-min max-w-control-panel-max ' />
      )}
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
