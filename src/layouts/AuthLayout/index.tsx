import { Player } from '@lottiefiles/react-lottie-player';
import { Outlet } from 'react-router-dom';

import authAnimate from '@/assets/lotties/auth-animate.json';
import Logo from '@/assets/svgs/Logo';

const AuthLayout = () => {
  return (
    <div className='w-full h-screen flex'>
      <div className='w-[514px] h-full flex flex-col items-center justify-center bg-gold-20'>
        <div className='p-6.5 pb-3'>
          <p>Finder</p>
          <h1 className='text-gold-70 text-[30px] font-bold'>
            Discover new friends around the world
          </h1>
        </div>
        <Player
          src={authAnimate}
          loop
          autoplay
          direction={-1}
          style={{
            background: 'transparent',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      </div>
      <div className='flex-1 h-full bg-blue-50'>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
