import { useCallback, useEffect, useRef, useState } from 'react';

import Card from '../Card';

const ARRAY = [
  {
    key: 1,
    url: 'https://p6-pc-sign.douyinpic.com/tos-cn-p-0015/fe83c1a2671741b6b0bb9af576e76d4a_1667045971~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=1983016800&x-signature=cIUGQEWcqwusUL8VjvjWdyVn6yU%3D',
  },
  {
    key: 2,
    url: 'https://p3-pc-sign.douyinpic.com/tos-cn-p-0015/8309d8383a3049b1acabc2b88765d074_1666867183~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=1983016800&x-signature=KoNQk2gQjHArvbuYBRm%2BEXES0eg%3D',
  },
  {
    key: 3,
    url: 'https://p6-pc-sign.douyinpic.com/tos-cn-p-0015/02e53861780d4aada8d14a9d18339b0e_1667569378~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=1983016800&x-signature=xNkluMZwGUENAAuJQrH0R4DfI%2Fs%3D',
  },
  {
    key: 4,
    url: 'https://p9-pc-sign.douyinpic.com/tos-cn-i-0813/da484996b7614e17b02d59dba2e28a50~noop.jpeg?biz_tag=pcweb_cover&from=3213915784&se=false&x-expires=1668866400&x-signature=vO%2BdxpXuVZVMvLzPDOLHOPoG2jc%3D',
  },
  {
    key: 5,
    url: 'https://p3-pc-sign.douyinpic.com/tos-cn-p-0015/c756523e406140f2aab148d9b83fb06e_1665925649~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=1983016800&x-signature=FeX9dfE6230xjdl%2B67SYOwlQWRY%3D',
  },
  {
    key: 6,
    url: 'https://p3-pc-sign.douyinpic.com/tos-cn-i-0813c001/f2f17793eeb9421799858a49bef93d75~noop.jpeg?biz_tag=pcweb_cover&from=3213915784&se=false&x-expires=1668866400&x-signature=4MISKCo0VAT0RPFyxekaNTWv4Q4%3D',
  },
  {
    key: 7,
    url: 'https://p9-pc-sign.douyinpic.com/tos-cn-i-0813/9adc22eb8b5247288fbf277ef7f435f3~noop.jpeg?biz_tag=pcweb_cover&from=3213915784&se=false&x-expires=1668866400&x-signature=ipGVj3jmm3ecQlM0fP438se9GVQ%3D',
  },
  {
    key: 8,
    url: 'https://p9-pc-sign.douyinpic.com/tos-cn-i-0813/48f4427bc63241fea7385c7dfd20cb25~noop.jpeg?biz_tag=pcweb_cover&from=3213915784&se=false&x-expires=1668866400&x-signature=iVrsmRoJTHnuZKRpe%2FfFr6BiMw8%3D',
  },
];

const NUMBER_OF_CARDS = 3;
interface Props {}
const CardBox = ({}: Props) => {
  const [data, setData] = useState(ARRAY.slice(NUMBER_OF_CARDS - 1));
  const [listImgs, setListImgs] = useState(() => {
    return ARRAY.slice(0, 2);
  });

  const [currentCard, setCurrentCard] = useState(
    listImgs[listImgs.length - 1].key,
  );
  const [prevCard, setPrevCard] = useState(-1);

  useEffect(() => {
    console.log('data', data);
    if (data.length === 0) {
      setData(
        Array.from({ length: 10 }).map((_, index) => ({
          key: index + 10,
          url: 'https://p6-pc-sign.douyinpic.com/tos-cn-p-0015/fe83c1a2671741b6b0bb9af576e76d4a_1667045971~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=1983016800&x-signature=cIUGQEWcqwusUL8VjvjWdyVn6yU%3D',
        })),
      );
    }
  }, [data]);
  useEffect(() => {
    console.log('currentCard', currentCard);
  }, [currentCard]);

  useEffect(() => {
    console.log('listImgs', listImgs);
  }, [listImgs]);

  const onLike = useCallback(() => {
    setListImgs(prev => {
      const newList = [...prev];
      if (prev.length < NUMBER_OF_CARDS) {
        newList.unshift(data[0]);
      } else {
        newList.pop();
        newList.unshift(data[0]);
      }

      setData(prev => prev.slice(1));
      setCurrentCard(newList[newList.length - 2].key);
      setPrevCard(newList[newList.length - 1].key);
      return newList;
    });
  }, [data]);

  const onNope = useCallback(() => {
    setListImgs(prev => {
      const newList = [...prev];
      if (prev.length < NUMBER_OF_CARDS) {
        newList.unshift(data[0]);
      } else {
        newList.pop();
        newList.unshift(data[0]);
      }

      setData(prev => prev.slice(1));
      setCurrentCard(newList[newList.length - 2].key);
      setPrevCard(newList[newList.length - 1].key);
      return newList;
    });
  }, [data]);

  return (
    <div className='flex flex-col select-none items-center justify-center w-full h-full bg-primary max-h-[667px] max-w-[375px] rounded-8 relative'>
      {listImgs.map(img => (
        <Card
          key={img.key}
          id={img.key}
          imgUrl={img.url}
          onLike={onLike}
          onNope={onNope}
        />
      ))}
      <div className='flex items-center justify-around absolute bottom-0 w-full h-6 bg-base'>
        <button
          className='w-6 h-6 rounded-full border border-solid border-blue-15 text-white'
          onClick={() => {
            window.dispatchEvent(new CustomEvent(`onNope${currentCard}`));
          }}
        >
          Nope
        </button>
        <button
          className='w-6 h-6 rounded-full border border-solid border-blue-15 text-white'
          onClick={() => {
            window.dispatchEvent(new CustomEvent(`onLike${currentCard}`));
          }}
        >
          Like
        </button>
      </div>
    </div>
  );
};

export default CardBox;
