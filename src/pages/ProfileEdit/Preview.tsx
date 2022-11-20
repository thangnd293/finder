import React, { useEffect } from 'react';

import HomeIcon from '@/assets/svgs/HomeIcon';
import InfoIcon from '@/assets/svgs/InfoIcon';
import LocationIcon from '@/assets/svgs/LocationIcon';
import Carousel from '@/components/Carousel';
import Information from '@/components/Information';

interface Props {}

const Preview = ({}: Props) => {
  const [showInfo, setShowInfo] = React.useState(false);

  const handleShowInfo = () => {
    setShowInfo(true);
  };

  const handleHiddenInfo = () => {
    setShowInfo(false);
  };

  useEffect(() => {
    console.log('showInfo', showInfo);
  }, [showInfo]);

  return (
    <div
      className=' w-full h-full absolute overflow-x-hidden overflow-y-auto z-10 rounded-8 bg-black overflow-hidden scroll-hidden'
      style={{
        paddingBottom: showInfo ? '0px' : '101px',
      }}
    >
      <Carousel
        style={{
          height: showInfo ? '60%' : '100%',
        }}
        isDrag={false}
        flipLeft={undefined}
        flipRight={undefined}
      />
      {showInfo ? (
        <div className='relative w-full bg-white rounded-b-8 pb-10'>
          <button onClick={handleHiddenInfo}>unlock</button>
          <Information />
        </div>
      ) : (
        <>
          <div
            className='w-full h-1/3 absolute bottom-[100px]'
            style={{
              backgroundImage:
                'linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(255, 255, 255, 0) 100%)',
            }}
          ></div>
          <div
            className='w-full h-fit p-1.6 absolute bottom-[100px] text-white cursor-pointer'
            onClick={handleShowInfo}
          >
            <p className='text-32 font-bold'>
              Nguyen Dac Thang <span className='text-26 font-normal'>22</span>
            </p>
            <div className='flex items-center'>
              <div className='flex-1'>
                <p className='space-x-0.4'>
                  <span className='inline-block w-0.8 h-0.8 rounded-full bg-indicator-green'></span>
                  <span className='text-14'>Recently Active</span>
                </p>
                <p className='flex items-center gap-0.5'>
                  <HomeIcon />
                  <span className='text-18'>Lives in Ho Chi Minh</span>
                </p>
                <p className='flex items-center gap-0.5'>
                  <LocationIcon />
                  <span className='text-18'>10 kilometers away</span>
                </p>
              </div>
              <button className='hover:scale-125 duration-300 cursor-pointer'>
                <InfoIcon />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Preview;
