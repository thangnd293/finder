import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import ControlPanel from '../ControlPanel';

import useMediaQuery from '@/hooks/useMediaQuery';

import { RESPONSIVE } from '@/common/constants/responsive';

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

  return (
    <div className='flex w-full h-screen'>
      {!isMobile && (
        <ControlPanel
          ref={ref}
          className='flex flex-col basis-1/4 min-w-control-panel-min max-w-control-panel-max '
        />
      )}
      <div
        style={{
          width: `calc(100% - ${controlPanelWidth}px)`,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
