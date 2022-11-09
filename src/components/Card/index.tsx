import { useCallback, useEffect } from 'react';
import React from 'react';
import { CSSProperties } from 'styled-components';

import useCardSwipe from '@/hooks/useCardSwipe';

interface Props {
  id: number;
  imgUrl: string;
  onLike: () => void;
  onNope: () => void;
  className?: string;
  style?: CSSProperties;
}

const Card = ({ id, imgUrl, style, onNope, onLike }: Props) => {
  const { ref, swipeToRight, swipeToLeft } = useCardSwipe(onLike, onNope);

  const handleLike = useCallback(() => {
    swipeToRight();
    onLike();
  }, [onLike, swipeToRight]);

  const handleNope = useCallback(() => {
    swipeToLeft();
    onNope();
  }, [onNope, swipeToLeft]);

  useEffect(() => {
    console.count(`run-${id}`);

    window.addEventListener(`onLike${id}`, handleLike);
    window.addEventListener(`onNope${id}`, handleNope);

    return () => {
      window.removeEventListener(`onLike${id}`, handleLike);
      window.removeEventListener(`onNope${id}`, handleNope);
    };
  }, [handleLike, handleNope]);

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
