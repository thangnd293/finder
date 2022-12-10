import { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import ControlPanel from '../ControlPanel';

import LogoIcon from '@/assets/svgs/Logo';

import useMediaQuery from '@/hooks/useMediaQuery';

import { RESPONSIVE } from '@/common/constants/responsive';
import { PATH } from '@/common/constants/route';

const DefaultLayout = () => {
  const ref = useRef<HTMLElement>(null);
  const [controlPanelWidth, setControlPanelWidth] = useState(0);

  const isMobile = useMediaQuery({
    mediaQuery: `(max-width: ${RESPONSIVE.md}px)`,
  });

  useEffect(() => {
    if (ref.current) {
      setControlPanelWidth(ref.current.offsetWidth);
    }
  }, [ref]);

  if (isMobile) {
    return (
      <div className='w-full h-screen flex flex-col bg-white'>
        <header className='h-[48px] bg-white'>header</header>
        <main className='flex-1 mx-0.4 overflow-auto'>
          <Outlet />
        </main>
        <nav className='w-full h-[44px] flex items-center justify-evenly bg-blue-05'>
          <Link to={PATH.APP.HOME}>
            <LogoIcon className='text-primary' />
          </Link>
          <Link to={PATH.APP.MATCHES}>
            <LogoIcon className='text-primary' />
          </Link>
          <Link to={PATH.APP.PROFILE.SELF}>
            <LogoIcon className='text-primary' />
          </Link>
        </nav>
      </div>
    );
  }

  return (
    <div className='flex w-full h-screen'>
      <ControlPanel
        ref={ref}
        className='flex flex-col basis-1/4 min-w-control-panel-min max-w-control-panel-max '
      />
      <div
        style={{
          width: !isMobile ? `calc(100% - ${controlPanelWidth}px)` : '100%',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
