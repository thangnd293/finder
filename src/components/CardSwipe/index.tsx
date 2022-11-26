import { User } from '@/api-graphql';
import { apiCaller } from '@/service';
import { useCallback, useEffect } from 'react';
import React from 'react';

import Carousel from '../Carousel';
import Information from '../Information';
import { flipLeft, flipRight } from './utils';

import DownArrowColorIcon from '@/assets/svgs/DownArrowColorIcon';
import HomeIcon from '@/assets/svgs/HomeIcon';
import InfoIcon from '@/assets/svgs/InfoIcon';
import LocationIcon from '@/assets/svgs/LocationIcon';

import useCardSwipe from '@/hooks/useCardSwipe';

interface Props {
  user: User;
  onLike: () => void;
  onNope: () => void;
  onBack: () => void;
  onShowInfo: any;
}

const CardSwipe = ({ user, onNope, onLike, onBack, onShowInfo }: Props) => {
  const {
    _id: id,
    username,
    age,
    images,
    lastActive,
    liveAt,
    calcDistance,
  } = user;
  const isRecentActive =
    lastActive &&
    Date.now() - new Date(lastActive).getTime() < 1000 * 60 * 60 * 24 * 1;

  const {
    ref,
    swipeToRight,
    swipeToLeft,
    swipeBack,
    setDisable,
    isDrag,
    status,
  } = useCardSwipe(
    async () => {
      onLike();
      await apiCaller.likeUser().$args({ user_id: id }).$fetch();
    },
    async () => {
      onNope();
      await apiCaller.skipUser().$args({ user_id: id }).$fetch();
    },
  );

  const [showInfo, setShowInfo] = React.useState(false);

  const handleLike = useCallback(async () => {
    swipeToRight();
    onLike();
    setShowInfo(false);
    setDisable(true);
    await apiCaller.likeUser().$args({ user_id: id }).$fetch();
  }, [onLike, swipeToRight, id]);

  const handleNope = useCallback(async () => {
    swipeToLeft();
    onNope();
    setShowInfo(false);
    setDisable(true);
    await apiCaller.skipUser().$args({ user_id: id }).$fetch().then().catch();
  }, [onNope, swipeToLeft, id]);

  const handleBack = useCallback(() => {
    swipeBack();
    onBack();
  }, [onBack, swipeBack]);

  useEffect(() => {
    window.addEventListener(`onLike${id}`, handleLike);
    window.addEventListener(`onNope${id}`, handleNope);
    window.addEventListener(`onBack${id}`, handleBack);

    return () => {
      window.removeEventListener(`onLike${id}`, handleLike);
      window.removeEventListener(`onNope${id}`, handleNope);
      window.removeEventListener(`onBack${id}`, handleBack);
    };
  }, [handleLike, handleNope, handleBack]);

  useEffect(() => {
    onShowInfo(showInfo);
  }, [showInfo]);

  const handleShowInfo = () => {
    if (status !== 'idle') return;
    setDisable(true);
    setShowInfo(true);
  };

  const handleHiddenInfo = () => {
    if (status !== 'idle') return;
    setDisable(false);
    setShowInfo(false);
  };

  const handleFlipLeft = useCallback(() => {
    if (status !== 'idle') return;
    flipLeft();
  }, [flipLeft, status]);

  const handleFlipRight = useCallback(() => {
    if (status !== 'idle') return;

    flipRight();
  }, [flipRight, status]);

  return (
    <div
      className=' w-full h-full absolute overflow-x-hidden overflow-y-auto z-10 rounded-8 bg-black overflow-hidden scroll-hidden'
      ref={ref}
      style={{
        paddingBottom: showInfo ? '0px' : '101px',
      }}
    >
      <Carousel
        images={images!}
        style={{
          height: showInfo ? '60%' : '100%',
        }}
        isDrag={isDrag && !showInfo}
        flipLeft={!showInfo ? handleFlipLeft : undefined}
        flipRight={!showInfo ? handleFlipRight : undefined}
      />
      {showInfo ? (
        <div className='relative w-full bg-white rounded-b-8 pb-10'>
          <button
            className='absolute -top-3 right-1.2'
            onClick={handleHiddenInfo}
          >
            <DownArrowColorIcon width={52} height={52} />
          </button>
          <Information user={user} />
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
              {username} <span className='text-26 font-normal'>{age}</span>
            </p>
            <div className='flex items-center'>
              <div className='flex-1'>
                {isRecentActive && (
                  <p className='space-x-0.4'>
                    <span className='inline-block w-0.8 h-0.8 rounded-full bg-indicator-green'></span>
                    <span className='text-14'>Có hoạt động gần đây</span>
                  </p>
                )}
                {liveAt && (
                  <p className='flex items-center gap-0.5'>
                    <HomeIcon />
                    <span className='text-18'>Sống tại {liveAt}</span>
                  </p>
                )}
                {calcDistance !== null && (
                  <p className='flex items-center gap-0.5'>
                    <LocationIcon />
                    <span className='text-18'>
                      Cách xa {Math.round(calcDistance / 1000)} km
                    </span>
                  </p>
                )}
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

export default React.memo(CardSwipe);
