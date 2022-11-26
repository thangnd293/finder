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

import { useHomeContext } from '@/pages/Home';

import HeartIcon from '@/assets/svgs/HeartIcon';
import NopeIcon from '@/assets/svgs/NopeIcon';
import RewindIcon from '@/assets/svgs/RewindIcon';

interface Props {
  className?: string;
}
const CardController = ({ className }: Props) => {
  const { userList, currUser, prevUser, onLike, onNope, onBack } =
    useHomeContext();

  const [showInfoCard, setShowInfoCard] = useState(false);

  const onShowInfo = useCallback(
    (value: boolean) => {
      setShowInfoCard(value);
    },
    [setShowInfoCard],
  );

  return (
    <Card id='card-inner' className={className ? className : ''}>
      <CardControllerWrapper id='card-wrapper'>
        {currUser ? (
          userList.map(
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
          )
        ) : (
          <div>Het roi! Mai quay lai</div>
        )}
        {currUser && (
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
                  window.dispatchEvent(
                    new CustomEvent(`onBack${prevUser?._id}`),
                  );
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
        )}
      </CardControllerWrapper>
    </Card>
  );
};

export default CardController;
