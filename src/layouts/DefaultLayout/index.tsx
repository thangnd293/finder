import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import ControlPanel from '../ControlPanel';

import ChatIcon from '@/assets/svgs/ChatIcon';
import LogoIcon from '@/assets/svgs/Logo';
import UserIcon from '@/assets/svgs/UserIcon';

import useMediaQuery from '@/hooks/useMediaQuery';

import { RESPONSIVE } from '@/common/constants/responsive';
import { PATH } from '@/common/constants/route';

const DefaultLayout = () => {
  const location = useLocation();

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
        <header className='h-[48px] bg-white flex items-center justify-center text-26 font-semibold text-primary'>
          Finder
        </header>
        <main className='flex-1 mx-0.4 overflow-auto'>
          <Outlet />
        </main>
        <nav className='w-full h-[44px] flex items-center justify-evenly'>
          {navs.map(nav => (
            <Link key={nav.path} to={nav.path}>
              <nav.icon
                className={`${
                  location.pathname === nav.path
                    ? 'text-primary'
                    : 'text-text-secondary'
                }`}
              />
            </Link>
          ))}
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

const navs = [
  {
    path: PATH.APP.HOME,
    icon: LogoIcon,
  },
  {
    path: PATH.APP.MATCHES,
    icon: ChatIcon,
  },
  {
    path: PATH.APP.PROFILE.SELF,
    icon: UserIcon,
  },
];
