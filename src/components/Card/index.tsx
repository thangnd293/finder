import { useCallback, useEffect } from 'react';
import React from 'react';

import { ICard } from '../CardController';
import Carousel from '../Carousel';
import Information from '../Information';
import { CardContainer } from './styles';
import { flipLeft, flipRight } from './utils';

import HomeIcon from '@/assets/svgs/HomeIcon';
import InfoIcon from '@/assets/svgs/InfoIcon';
import LocationIcon from '@/assets/svgs/LocationIcon';

import useCardSwipe from '@/hooks/useCardSwipe';

interface Props {
  card: ICard;
  onLike: () => void;
  onNope: () => void;
  onBack: () => void;
  onShowInfo: any;
}

const Card = ({
  card: { id, url },
  onNope,
  onLike,
  onBack,
  onShowInfo,
}: Props) => {
  const {
    ref,
    swipeToRight,
    swipeToLeft,
    swipeBack,
    setDisable,
    isDrag,
    status,
  } = useCardSwipe(onLike, onNope);

  const [showInfo, setShowInfo] = React.useState(false);

  const handleLike = useCallback(() => {
    swipeToRight();
    onLike();
    setShowInfo(false);
  }, [onLike, swipeToRight]);

  const handleNope = useCallback(() => {
    swipeToLeft();
    onNope();
    setShowInfo(false);
  }, [onNope, swipeToLeft]);

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
    <CardContainer
      ref={ref}
      style={{
        paddingBottom: showInfo ? '0px' : '101px',
      }}
    >
      <Carousel
        style={{
          height: showInfo ? '60%' : '100%',
        }}
        isDrag={isDrag && !showInfo}
        flipLeft={!showInfo ? handleFlipLeft : undefined}
        flipRight={!showInfo ? handleFlipRight : undefined}
      />
      {!showInfo ? (
        <>
          <div
            className='w-full h-1/3 absolute bottom-[100px]'
            style={{
              backgroundImage:
                'linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(255, 255, 255, 0) 100%)',
            }}
          ></div>
          <div
            className='w-full h-fit p-1.6 absolute z-10 bottom-[100px] text-white cursor-pointer'
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
      ) : (
        <div className='relative w-full bg-white rounded-b-8 pb-10'>
          <button onClick={handleHiddenInfo}>unlock</button>
          <Information />
        </div>
      )}
    </CardContainer>
  );
};

export default React.memo(Card);
