import { useEffect } from 'react';
import { CSSProperties } from 'styled-components';

import useCardSwipe from '@/hooks/useCardSwipe';

interface Props {
  imgUrl: string;
  onLike?: () => void;
  onNope?: () => void;
  className?: string;
  style?: CSSProperties;
  active?: boolean;
}

const Card = ({ imgUrl, style, onLike, onNope, active }: Props) => {
  const { ref, swipeToRight } = useCardSwipe();
  useEffect(() => {
    onLike?.();
    swipeToRight();
  }, [active, onLike]);

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

export default Card;
