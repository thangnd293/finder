import { Player } from '@lottiefiles/react-lottie-player';
import { Outlet } from 'react-router-dom';

import authAnimate from '@/assets/lotties/auth-animate.json';

const AuthLayout = () => {
  return (
    <div className='w-full h-screen flex bg-gold-20'>
      <div className='w-[514px] h-full flex flex-col items-center justify-center'>
        <div className='p-6.5 pb-3'>
          <p>Finder</p>
          <h1 className='text-gold-70 text-[30px] font-bold'>
            Khám phá những người bạn mới trên khắp thế giới
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
      <div className='flex-1 h-full p-3'>
        <div className='flex items-center justify-center w-full h-full bg-white rounded-8'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
