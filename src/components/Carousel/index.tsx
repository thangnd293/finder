import { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { ICard } from '../CardBox';

const ARRAY: ICard[] = [
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

interface Props {}

const Carousel = ({}: Props) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    console.log('currentSlide', currentPage);
  }, [currentPage]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className='h-full w-full relative'>
      <Pagination
        numberOfPages={ARRAY.length}
        currentPage={currentPage}
        onChange={onPageChange}
      />
      <div
        className='h-full w-full flex'
        style={{
          transform: `translateX(-${currentPage * 100}%)`,
        }}
      >
        {ARRAY.map(item => (
          <div
            key={item.id}
            className='min-w-full w-full h-full rounded-8 overflow-hidden'
          >
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
      <button className='absolute top-1/2 -translate-y-1/2 left-0'>prev</button>
      <button className='absolute top-1/2 -translate-y-1/2 right-0'>
        next
      </button>
    </div>
  );
};

export default Carousel;

// const Button = styled.button`
//   /* ${tw`h-0.5 w-full rounded-full py-0.5 bg-background-tapping`} */
// `;
interface PaginationProps {
  numberOfPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}
const Pagination = ({
  numberOfPages,
  currentPage,
  onChange,
}: PaginationProps) => {
  const handleChange = (page: number) => {
    onChange(page);
  };

  return (
    <div className='absolute w-full p-0.8 flex gap-0.4 rounded-8 overflow-hidden z-10'>
      {Array.from({ length: numberOfPages }).map((_, index) => {
        console.log(index, currentPage, 'test');
        return (
          <button
            key={index}
            className={`h-0.6 w-full rounded-full py-0.4 ${
              index === currentPage ? 'bg-white' : 'bg-background-tapping'
            }`}
            // active={currentPage === index}
            onClick={() => {
              handleChange(index);
            }}
          />
        );
      })}
    </div>
  );
};
