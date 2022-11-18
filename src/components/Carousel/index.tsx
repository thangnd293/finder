import { CSSProperties, useRef, useState } from 'react';

import { ICardSwipe } from '../CardController';
import Pagination from './Pagination';
import { ButtonNext, ButtonPrev } from './styles';

import ArrowLeftIcon from '@/assets/svgs/ArrowLeftIcon';

const ARRAY: ICardSwipe[] = [
  {
    id: 1,
    url: 'https://p6-pc-sign.douyinpic.com/tos-cn-p-0015/fe83c1a2671741b6b0bb9af576e76d4a_1667045971~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=1983016800&x-signature=cIUGQEWcqwusUL8VjvjWdyVn6yU%3D',
  },
  {
    id: 2,
    url: 'https://p3-pc-sign.douyinpic.com/tos-cn-p-0015/8309d8383a3049b1acabc2b88765d074_1666867183~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=1983016800&x-signature=KoNQk2gQjHArvbuYBRm%2BEXES0eg%3D',
  },
  {
    id: 3,
    url: 'https://p6-pc-sign.douyinpic.com/tos-cn-p-0015/02e53861780d4aada8d14a9d18339b0e_1667569378~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=1983016800&x-signature=xNkluMZwGUENAAuJQrH0R4DfI%2Fs%3D',
  },
  {
    id: 4,
    url: 'https://p9-pc-sign.douyinpic.com/tos-cn-i-0813/da484996b7614e17b02d59dba2e28a50~noop.jpeg?biz_tag=pcweb_cover&from=3213915784&se=false&x-expires=1668866400&x-signature=vO%2BdxpXuVZVMvLzPDOLHOPoG2jc%3D',
  },
  {
    id: 5,
    url: 'https://p3-pc-sign.douyinpic.com/tos-cn-p-0015/c756523e406140f2aab148d9b83fb06e_1665925649~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=1983016800&x-signature=FeX9dfE6230xjdl%2B67SYOwlQWRY%3D',
  },
  {
    id: 6,
    url: 'https://p3-pc-sign.douyinpic.com/tos-cn-i-0813c001/f2f17793eeb9421799858a49bef93d75~noop.jpeg?biz_tag=pcweb_cover&from=3213915784&se=false&x-expires=1668866400&x-signature=4MISKCo0VAT0RPFyxekaNTWv4Q4%3D',
  },
  {
    id: 7,
    url: 'https://p9-pc-sign.douyinpic.com/tos-cn-i-0813/9adc22eb8b5247288fbf277ef7f435f3~noop.jpeg?biz_tag=pcweb_cover&from=3213915784&se=false&x-expires=1668866400&x-signature=ipGVj3jmm3ecQlM0fP438se9GVQ%3D',
  },
  {
    id: 8,
    url: 'https://p9-pc-sign.douyinpic.com/tos-cn-i-0813/48f4427bc63241fea7385c7dfd20cb25~noop.jpeg?biz_tag=pcweb_cover&from=3213915784&se=false&x-expires=1668866400&x-signature=iVrsmRoJTHnuZKRpe%2FfFr6BiMw8%3D',
  },
];

const TIME_ANIMATION = 100;
interface Props {
  isDrag: boolean;
  flipLeft?: () => void;
  flipRight?: () => void;
  style?: CSSProperties;
}

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

const Carousel = ({ isDrag, flipLeft, flipRight, style }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const FIRST_PAGE = 0;
  const LAST_PAGE = ARRAY.length - 1;

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
        numberOfPages={ARRAY.length}
        currentPage={currentPage}
        onChange={onPageChange}
      />
      <div
        className='h-full w-full flex absolute'
        style={{
          transform: `translateX(-${currentPage * 100}%)`,
        }}
      >
        {ARRAY.map(item => (
          <div key={item.id} className='min-w-full w-full h-full'>
            <img
              className='w-full h-full object-cover object-center'
              key={item.id}
              src={item.url}
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
