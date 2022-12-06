import { CSSProperties, useRef, useState } from 'react';

import Pagination from './Pagination';
import { ButtonNext, ButtonPrev } from './styles';

import ArrowLeftIcon from '@/assets/svgs/ArrowLeftIcon';

const TIME_ANIMATION = 100;

const translateLeft = (el: HTMLDivElement) => {
  el.style.transform = `translateX(-10px)`;
  el.style.transition = `transform ${TIME_ANIMATION}ms ease-in-out`;
  setTimeout(() => {
    el.style.transform = `translateX(${0}%)`;
    el.style.transition = `none`;
  }, TIME_ANIMATION);
};

const translateRight = (el: HTMLDivElement) => {
  el.style.transform = `translateX(10px)`;
  el.style.transition = `transform ${TIME_ANIMATION}ms ease-in-out`;
  setTimeout(() => {
    el.style.transform = `translateX(${0}%)`;
    el.style.transition = `none`;
  }, TIME_ANIMATION);
};

interface Props {
  images: string[];
  isDrag: boolean;
  flipLeft?: () => void;
  flipRight?: () => void;
  style?: CSSProperties;
}

const Carousel = ({ images, isDrag, flipLeft, flipRight, style }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const FIRST_PAGE = 0;
  const LAST_PAGE = images.length - 1;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (isDrag) return;
    if (currentPage === LAST_PAGE) {
      if (flipRight) return flipRight();

      const el = ref.current;
      if (!el) return;
      return translateLeft(el);
    }

    setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (isDrag) return;
    if (currentPage === FIRST_PAGE) {
      if (flipLeft) return flipLeft();

      const el = ref.current;
      if (!el) return;
      return translateRight(el);
    }

    setCurrentPage(prev => prev - 1);
  };

  return (
    <div ref={ref} className='h-full w-full relative group' style={style}>
      <Pagination
        numberOfPages={images.length}
        currentPage={currentPage}
        onChange={onPageChange}
      />
      <div
        className='h-full w-full flex absolute'
        style={{
          transform: `translateX(-${currentPage * 100}%)`,
        }}
      >
        {images?.map((item, index) => (
          <div key={index} className='min-w-full w-full h-full'>
            <img
              className='w-full h-full object-cover object-center'
              src={item}
              alt=''
              draggable={false}
            />
          </div>
        ))}
      </div>
      <ButtonPrev onClick={handlePrev}>
        {currentPage !== FIRST_PAGE && <ArrowLeftIcon />}
      </ButtonPrev>
      <ButtonNext onClick={handleNext}>
        {currentPage !== LAST_PAGE && <ArrowLeftIcon />}
      </ButtonNext>
    </div>
  );
};

export default Carousel;
