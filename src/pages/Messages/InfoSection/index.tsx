import { Fragment } from 'react';

import { useMessagesContext } from '..';

import Carousel from '@/components/Carousel';
import Information from '@/components/Information/index';

interface Props {}

const InfoSection = ({}: Props) => {
  const { conversation } = useMessagesContext();
  if (!conversation) return <Fragment />;

  return (
    <div className='hidden w-[324px] lg:flex flex-col'>
      <div className='flex-1 overflow-x-hidden overflow-y-scroll scroll-hidden'>
        <div className='h-2/3'>
          <Carousel isDrag={false} images={conversation.user!.images!} />
        </div>
        <div className='bg-white'>
          <Information user={conversation.user!} />
        </div>
      </div>
      <div className='h-[76.5px] border-0 border-l border-t border-solid border-gray-20 '>
        <button className='w-1/2 h-full text-center align-middle text-gray-40 text-14 font-semibold uppercase hover:bg-gradient-to-r from-gradient-start to-gradient-end hover:text-white'>
          Unmatch
        </button>
        <button className='w-1/2 h-full text-center align-middle text-gray-40 text-14 font-semibold uppercase border-0 border-l border-solid border-gray-20 hover:bg-gradient-to-r from-gradient-start to-gradient-end hover:text-white'>
          Report
        </button>
      </div>
    </div>
  );
};

export default InfoSection;
