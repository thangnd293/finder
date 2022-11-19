import { useCallback, useEffect, useState } from 'react';

import Card from '../Card';
import CardSwipe from '../CardSwipe';
import {
  ActionWrapper,
  ButtonLike,
  ButtonNope,
  ButtonRewind,
  CardControllerWrapper,
} from './styles';

import HeartIcon from '@/assets/svgs/HeartIcon';
import NopeIcon from '@/assets/svgs/NopeIcon';
import RewindIcon from '@/assets/svgs/RewindIcon';

export interface ICardSwipe {
  id: number;
  url: string;
}
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

const NUMBER_OF_CARDS = 3;
interface Props {}
const CardController = ({}: Props) => {
  const [data, setData] = useState(ARRAY.slice(NUMBER_OF_CARDS - 1));
  const [listImgs, setListImgs] = useState(() => {
    return ARRAY.slice(0, 2);
  });

  const [currentCard, setCurrentCard] = useState(
    listImgs[listImgs.length - 1].id,
  );
  const [prevCard, setPrevCard] = useState<ICardSwipe | null>(null);

  useEffect(() => {
    if (data.length === 0) {
      setData(
        Array.from({ length: 10 }).map((_, index) => ({
          id: index + 10,
          url: 'https://p6-pc-sign.douyinpic.com/tos-cn-p-0015/fe83c1a2671741b6b0bb9af576e76d4a_1667045971~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=1983016800&x-signature=cIUGQEWcqwusUL8VjvjWdyVn6yU%3D',
        })),
      );
    }
  }, [data]);

  const updateListImgs = useCallback(() => {
    setListImgs(prev => {
      const newList = [...prev];
      if (prev.length < NUMBER_OF_CARDS) {
        newList.unshift(data[0]);
      } else {
        if (prevCard) {
          newList.pop();
          newList.unshift(data[0]);
        }
      }
      setData(prev => prev.slice(1));
      setCurrentCard(newList[newList.length - 2].id);
      setPrevCard(newList[newList.length - 1]);
      return newList;
    });
  }, [data, prevCard]);

  const onLike = useCallback(() => {
    updateListImgs();
  }, [updateListImgs]);

  const onNope = useCallback(() => {
    updateListImgs();
  }, [updateListImgs]);

  const onBack = useCallback(() => {
    if (prevCard) {
      setData(prev => [...prev, prevCard]);
      setPrevCard(null);
      setCurrentCard(listImgs[listImgs.length - 1].id);
    }
  }, [data, prevCard, listImgs]);

  const [showInfoCard, setShowInfoCard] = useState(false);

  const onShowInfo = useCallback(
    (value: boolean) => {
      setShowInfoCard(value);
    },
    [setShowInfoCard],
  );

  return (
    <Card id='card-inner'>
      <CardControllerWrapper id='card-wrapper'>
        {listImgs.map(item => (
          <CardSwipe
            key={item.id}
            card={item}
            onLike={onLike}
            onNope={onNope}
            onBack={onBack}
            onShowInfo={onShowInfo}
          />
        ))}
        <ActionWrapper id='action-wrapper' solid={showInfoCard}>
          <ButtonNope
            variant={showInfoCard ? 'solid' : 'outline'}
            size='large'
            onClick={() => {
              window.dispatchEvent(new CustomEvent(`onNope${currentCard}`));
            }}
          >
            <NopeIcon />
          </ButtonNope>
          {!showInfoCard && (
            <ButtonRewind
              active={!!prevCard}
              onClick={() => {
                if (!prevCard) return;
                window.dispatchEvent(new CustomEvent(`onBack${prevCard?.id}`));
              }}
            >
              <RewindIcon />
            </ButtonRewind>
          )}
          <ButtonLike
            variant={showInfoCard ? 'solid' : 'outline'}
            size='large'
            onClick={() => {
              window.dispatchEvent(new CustomEvent(`onLike${currentCard}`));
            }}
          >
            <HeartIcon />
          </ButtonLike>
        </ActionWrapper>
      </CardControllerWrapper>
    </Card>
  );
};

export default CardController;
