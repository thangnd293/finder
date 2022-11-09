import { useCallback, useEffect } from 'react';
import React from 'react';
import { CSSProperties } from 'styled-components';

import useCardSwipe from '@/hooks/useCardSwipe';

interface Props {
  id: number;
  imgUrl: string;
  onLike: () => void;
  onNope: () => void;
  onBack: () => void;
  className?: string;
  style?: CSSProperties;
}

const Card = ({ id, imgUrl, style, onNope, onLike, onBack }: Props) => {
  const { ref, swipeToRight, swipeToLeft, swipeBack } = useCardSwipe(
    onLike,
    onNope,
  );

  const handleLike = useCallback(() => {
    swipeToRight();
    onLike();
  }, [onLike, swipeToRight]);

  const handleNope = useCallback(() => {
    swipeToLeft();
    onNope();
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

  return (
    <div className={`w-full h-full absolute`} style={style} ref={ref}>
      <div className='w-full h-full object-cover object-center rounded-8 flex items-center justify-center'>
        <img
          className='w-full h-full object-cover object-center overflow-hidden'
          src={imgUrl}
          alt=''
          draggable={false}
        />
      </div>
    </div>
  );
};

export default React.memo(Card);
