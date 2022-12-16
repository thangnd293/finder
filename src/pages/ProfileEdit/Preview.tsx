import { useFormikContext } from 'formik';
import React from 'react';

import { IInformationData } from '.';

import { useUserStore } from '@/store/user';

import DownArrowColorIcon from '@/assets/svgs/DownArrowColorIcon';
import HomeIcon from '@/assets/svgs/HomeIcon';
import InfoIcon from '@/assets/svgs/InfoIcon';
import Carousel from '@/components/Carousel';
import Information from '@/components/Information';

const Preview = () => {
  const [showInfo, setShowInfo] = React.useState(false);
  const user = useUserStore(s => s.user);
  const { values } = useFormikContext<IInformationData>();

  const handleShowInfo = () => {
    setShowInfo(true);
  };

  const handleHiddenInfo = () => {
    setShowInfo(false);
  };

  return (
    <div
      className='w-full h-[calc(100%-47px)] absolute overflow-x-hidden overflow-y-auto z-10 rounded-8 bg-black overflow-hidden scroll-hidden'
      style={{
        paddingBottom: showInfo ? '0px' : '101px',
      }}
    >
      {user?.images && (
        <Carousel
          images={values.images}
          style={{
            height: showInfo ? '60%' : '100%',
          }}
          isDrag={false}
          flipLeft={undefined}
          flipRight={undefined}
        />
      )}
      {showInfo && user ? (
        <div className='relative w-full bg-white rounded-b-8 pb-10'>
          <button
            className='absolute -top-3 right-1.2'
            onClick={handleHiddenInfo}
          >
            <DownArrowColorIcon width={52} height={52} />
          </button>
          <Information user={user} previewData={values} />
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
            className='w-full h-fit p-1.6 absolute bottom-1 text-white cursor-pointer'
            onClick={handleShowInfo}
          >
            <p className='text-32 font-bold'>
              {user?.username}{' '}
              <span className='text-26 font-normal'>{user?.age}</span>
            </p>
            <div className='flex items-center'>
              <div className='flex-1'>
                <p className='flex items-center gap-0.5'>
                  <HomeIcon />
                  <span className='text-18'>Lives in Ho Chi Minh</span>
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
