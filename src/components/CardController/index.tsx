import { useCallback, useState } from 'react';

import Card from '../Card';
import CardSwipe from '../CardSwipe';
import Space from '../Space';
import {
  ActionWrapper,
  ButtonLike,
  ButtonNope,
  ButtonRewind,
  CardControllerWrapper,
} from './styles';

import { useHomeContext } from '@/pages/Home';

import { useUserStore } from '@/store/user';

import HeartIcon from '@/assets/svgs/HeartIcon';
import NopeIcon from '@/assets/svgs/NopeIcon';
import RewindIcon from '@/assets/svgs/RewindIcon';
import Loading from '@/components/Loading';

interface Props {
  className?: string;
}
const CardController = ({ className }: Props) => {
  const user = useUserStore(s => s.user);
  const { userList, currUser, prevUser, onLike, onNope, onBack } =
    useHomeContext();

  const [showInfoCard, setShowInfoCard] = useState(false);

  const onShowInfo = useCallback(
    (value: boolean) => {
      setShowInfoCard(value);
    },
    [setShowInfoCard],
  );

  return currUser ? (
    <Card id='card-inner' className={className ? className : ''}>
      <CardControllerWrapper id='card-wrapper'>
        {userList.map(
          item =>
            item && (
              <CardSwipe
                key={item?._id}
                user={item}
                onLike={onLike}
                onNope={onNope}
                onBack={onBack}
                onShowInfo={onShowInfo}
              />
            ),
        )}
        <ActionWrapper id='action-wrapper' solid={showInfoCard}>
          <ButtonNope
            variant={showInfoCard ? 'solid' : 'outline'}
            size='large'
            onClick={() => {
              window.dispatchEvent(new CustomEvent(`onNope${currUser._id}`));
            }}
          >
            <NopeIcon />
          </ButtonNope>
          {!showInfoCard && (
            <ButtonRewind
              active={!!prevUser}
              onClick={() => {
                if (!prevUser) return;
                window.dispatchEvent(new CustomEvent(`onBack${prevUser?._id}`));
              }}
            >
              <RewindIcon />
            </ButtonRewind>
          )}
          <ButtonLike
            variant={showInfoCard ? 'solid' : 'outline'}
            size='large'
            onClick={() => {
              window.dispatchEvent(new CustomEvent(`onLike${currUser._id}`));
            }}
          >
            <HeartIcon />
          </ButtonLike>
        </ActionWrapper>
      </CardControllerWrapper>
    </Card>
  ) : (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${
        className ? className : ''
      }`}
    >
      <Loading image={user?.images?.[0]} />
      <Space h={100} />
      <p className='w-35 text-center text-16 text-text-secondary'>
        Ch??ng t??i kh??ng th??? t??m th???y b???t k??? tr???n ?????u ti???m n??ng n??o ngay b??y gi???.
        H??y th??? thay ?????i t??y ch???n c???a b???n ????? xem ai ??? g???n
      </p>
    </div>
  );
};

export default CardController;
