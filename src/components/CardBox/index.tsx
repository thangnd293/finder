import { useEffect, useRef, useState } from 'react';

import Card from '../Card';

interface Props {}
const ARRAY = Array.from(
  { length: 10 },
  (_, i) => `https://loremflickr.com/375/667/dog?random=${i}`,
);
const CardBox = ({}: Props) => {
  const count = useRef(0);
  const [listImgs, setListImgs] = useState(() => {
    return ARRAY.slice(0, 4);
  });

  const onLike = () => {
    count.current += 1;
    console.log('Im like');

    setListImgs(ARRAY.slice(count.current, 4 + count.current));
  };

  const onNope = () => {
    count.current += 1;
    console.log('Im not like');

    setListImgs(ARRAY.slice(count.current, 4 + count.current));
  };

  return (
    <div className='flex flex-col select-none items-center justify-center w-full h-full bg-primary max-h-[667px] max-w-[375px] rounded-8 relative'>
      {listImgs.map((img, index) => (
        <Card
          style={{
            zIndex: 4 - index,
          }}
          key={index}
          imgUrl={img}
          onLike={() => {
            onLike();
          }}
          onNope={onNope}
        />
      ))}
    </div>
  );
};

export default CardBox;
