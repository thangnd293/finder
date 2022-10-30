import { Outlet } from 'react-router-dom';

import ControlPanel from '../ControlPanel';

const DefaultLayout = () => {
  return (
    <div className='flex w-full h-screen'>
      <ControlPanel />
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
