import { useState } from 'react';

import LoadingIcon from '@/assets/svgs/LoadingIcon';

interface Props {
  src: string;
  alt: string;
}

const Image = ({ src, alt }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const image = document.createElement('img');
  image.src = src;
  image.alt = alt;

  image.onload = () => {
    setIsLoaded(true);
  };

  return isLoaded ? (
    <img
      className='w-full h-full object-cover object-center'
      src={src}
      alt={alt}
      draggable={false}
    />
  ) : (
    <div className='w-full h-full flex items-center justify-center bg-black'>
      <LoadingIcon />
    </div>
  );
};

export default Image;
